package com.messaging.mechat.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.messaging.mechat.collection.users.UserData;
import com.messaging.mechat.exception.MeChatException;
import com.messaging.mechat.model.UserRegistration;
import com.messaging.mechat.repository.UserRepository;
import com.messaging.mechat.service.UserService;
import com.messaging.mechat.utils.UserRequestValidations;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.Objects;

import static com.messaging.mechat.exception.ErrorCode.ERR_INVALID_REQUEST;
import static com.messaging.mechat.security.filter.AuthConstants.AccessErrorCode.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;
    private final UserRequestValidations validator;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserData user = userRepository.findByEmail(email);
        if (Objects.isNull(user)) {
            log.error("No user found with mail id: {}", email);
            throw new UsernameNotFoundException(ERR_USR_NOT_FOUND.toString());
        }
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
            UserData userData = userRepository.findByEmail(user.getEmail());
            if (Objects.nonNull(userData)) {
                log.error("Email: {} already registered", user.getEmail());
                throw new MeChatException(ERR_USR_ALREADY_EXISTS.toString(), ERR_USR_ALREADY_EXISTS.message, HttpStatus.BAD_REQUEST);
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
                throw new MeChatException(ERR_INVALID_REQUEST.toString(), ex.getMessage(), HttpStatus.BAD_REQUEST);
            }
            throw new MeChatException(ERR_USR_REGISTRATION_FAILED.toString(), ERR_USR_REGISTRATION_FAILED.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
