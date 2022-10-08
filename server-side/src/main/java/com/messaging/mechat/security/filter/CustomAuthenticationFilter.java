package com.messaging.mechat.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.messaging.mechat.exception.ErrorDetails;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.messaging.mechat.security.filter.AuthConstants.*;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final ObjectMapper objectMapper;
    private final String jwtSecret;
    private final String accessTokenExpiresAt;
    private final String refreshTokenExpiresAt;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager, ObjectMapper objectMapper, Environment environment) {
        this.authenticationManager = authenticationManager;
        this.objectMapper = objectMapper;
        this.jwtSecret = environment.getProperty(jwtSecret_key);
        this.accessTokenExpiresAt = environment.getProperty(accessTokenExpiresAt_key);
        this.refreshTokenExpiresAt = environment.getProperty(refreshTokenExpiresAt_key);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String email = request.getHeader(authEmail_key);
        String password = request.getHeader(authPassword_key);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {
        User user = (User) authentication.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret.getBytes());
        String accessToken = JWT.create().withSubject(user.getUsername()).withExpiresAt(getTokenExpireTime(accessTokenExpiresAt)).withIssuer(request.getRequestURL().toString()).sign(algorithm);
        String refreshToken = JWT.create().withSubject(user.getUsername()).withExpiresAt(getTokenExpireTime(refreshTokenExpiresAt)).withIssuer(request.getRequestURL().toString()).sign(algorithm);
        Map<String, String> tokens = new HashMap<>();
        tokens.put(accessToken_key, accessToken);
        tokens.put(refreshToken_key, refreshToken);
        response.setContentType(APPLICATION_JSON_VALUE);
        objectMapper.writeValue(response.getOutputStream(), tokens);
    }

    private Date getTokenExpireTime(String expiresAt) {
        long period;
        ChronoUnit unit;
        try {
            String[] expiryAttributes = expiresAt.split(":");
            period = Integer.parseInt(expiryAttributes[0]);
            unit = ChronoUnit.valueOf(expiryAttributes[1].trim().toUpperCase());
        } catch (Exception ex) {
            period = defaultTokenExpiryPeriod;
            unit = defaultTokenExpiryPeriodUnit;
        }
        LocalDateTime dateTime = LocalDateTime.now().plus(Duration.of(period, unit));
        return Date.from(dateTime.atZone(ZoneId.systemDefault()).toInstant());
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
        response.setStatus(FORBIDDEN.value());
        response.setContentType(APPLICATION_JSON_VALUE);
        AccessErrorCode errorCode = AccessErrorCode.ERR_USR_UNAUTHORIZED;
        try {
            if (AccessErrorCode.valueOf(failed.getMessage()) == AccessErrorCode.ERR_USR_NOT_FOUND) {
                errorCode = AccessErrorCode.ERR_USR_NOT_FOUND;
                response.setStatus(UNAUTHORIZED.value());
            }
        } catch (Exception ex) {
            logger.debug(ex.getMessage());
        }
        ErrorDetails error = new ErrorDetails(errorCode.toString(), errorCode.message);
        objectMapper.writeValue(response.getOutputStream(), error);
    }

}
