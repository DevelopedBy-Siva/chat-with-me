package com.messaging.mechat.service.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.messaging.mechat.collection.users.UserData;
import com.messaging.mechat.exception.MeChatException;
import com.messaging.mechat.model.JwtTokens;
import com.messaging.mechat.model.UserRegistration;
import com.messaging.mechat.repository.UserRepository;
import com.messaging.mechat.service.UserService;
import com.messaging.mechat.utils.UserRequestValidations;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.Objects;

import static com.messaging.mechat.constants.AuthConstants.*;
import static com.messaging.mechat.exception.ErrorCode.*;
import static com.messaging.mechat.utils.JwtTokenUtils.getTokenExpireTime;
import static com.messaging.mechat.utils.JwtTokenUtils.userRoles;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;
    private final UserRequestValidations validator;
    private final BCryptPasswordEncoder passwordEncoder;
    private final Environment environment;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserData user = userRepository.findByEmail(email).orElseThrow(() -> {
            log.error("No user found with mail id: {}", email);
            throw new UsernameNotFoundException(ERR_USR_NOT_FOUND.toString());
        });
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        UserDetails userDetails = new User(user.getEmail(), user.getPassword(), authorities);
        return userDetails;
    }

    @Override
    public void registerUser(Map<String, String> request) {
        UserRegistration user = new UserRegistration(objectMapper, request);
        try {
            if (Objects.isNull(user))
                throw new ValidationException("Failed to obtain registration details. User is null.");
            validator.validateRegisterRequest(user);

            boolean isUserPresent = userRepository.findByEmail(user.getEmail()).isPresent();
            if (isUserPresent) {
                log.error("Email: {} already registered", user.getEmail());
                throw new MeChatException(ERR_USR_ALREADY_EXISTS, ERR_USR_ALREADY_EXISTS.message, HttpStatus.BAD_REQUEST);
            }

            UserData registerUser = objectMapper.convertValue(user, UserData.class);
            // Encode Password before storing to DB
            registerUser.setPassword(passwordEncoder.encode(registerUser.getPassword()));
            userRepository.save(registerUser);
            log.info("User with email: {} is registered successfully.", user.getEmail());
        } catch (Exception ex) {
            if (ex instanceof MeChatException)
                throw ex;
            if (ex instanceof ValidationException) {
                log.error("Invalid request: {}", ex.getMessage());
                throw new MeChatException(ERR_INVALID_REQUEST, ex.getMessage(), HttpStatus.BAD_REQUEST);
            }
            throw new MeChatException(ERR_USR_REGISTRATION_FAILED, ERR_USR_REGISTRATION_FAILED.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public JwtTokens generateJwtTokens(HttpServletRequest request) throws IOException {
        String authorizationHeader = request.getHeader(authHeader_key);
        if (Objects.isNull(authorizationHeader) || !authorizationHeader.startsWith(authHeader_tokenPrefix)) {
            log.info("A Refresh Token is nequired to generate a new Access Token");
            throw new MeChatException(ERR_INVALID_REQUEST, "Refresh token expected", HttpStatus.FORBIDDEN);
        }
        try {
            String refreshToken = authorizationHeader.substring(authHeader_tokenPrefix.length());
            Algorithm algorithm = Algorithm.HMAC256(environment.getProperty(jwtSecret_key).getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(refreshToken);
            String username = decodedJWT.getSubject();
            UserData user = userRepository.findByEmail(username).get();
            String accessToken = JWT.create().withSubject(user.getEmail())
                    .withExpiresAt(getTokenExpireTime(environment.getProperty(accessTokenExpiresAt_key)))
                    .withIssuer(request.getRequestURL().toString())
                    .withClaim(jwtRolesPlaceholder_key, userRoles())
                    .sign(algorithm);
            log.info("New Access Token is generated");
            return new JwtTokens(accessToken, refreshToken);
        } catch (Exception ex) {
            log.error("Failed to generate new Access Token: {}", ex.getMessage());
            throw new MeChatException(ERR_INVALID_REQUEST, "Failed to generate new Access Token", HttpStatus.FORBIDDEN);
        }
    }

}
