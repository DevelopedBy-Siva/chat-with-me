package com.messaging.mechat.utils;

import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.messaging.mechat.exception.ErrorCode;
import com.messaging.mechat.exception.ErrorDetails;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static com.messaging.mechat.constants.AuthConstants.*;
import static com.messaging.mechat.exception.ErrorCode.*;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
public class JwtTokenUtils {

    private static final String[] USER_ROLES = {"USER"};

    public static Date getTokenExpireTime(String expiresAt) {
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

    public static void handleJwtTokenErrors(Exception exception, HttpServletResponse response, ObjectMapper objectMapper) throws IOException {
        ErrorCode errorCode = ACCESS_FORBIDDEN;
        if (exception instanceof TokenExpiredException)
            errorCode = JWT_TOKEN_EXPIRED;
        else if (exception instanceof SignatureVerificationException)
            errorCode = JWT_TOKEN_INVALID;

        log.error("Failed to authenticate: {}", exception.getMessage());
        response.setStatus(FORBIDDEN.value());
        response.setContentType(APPLICATION_JSON_VALUE);
        objectMapper.writeValue(response.getOutputStream(), new ErrorDetails(errorCode, errorCode.message));
    }

    public static boolean authenticatePath(String path) {
        if (path.startsWith(authenticatedApi_mapping) && !path.contains(refreshTokenApi_mapping))
            return true;
        return false;
    }

    public static List<String> userRoles() {
        return Arrays.asList(USER_ROLES);
    }
}
