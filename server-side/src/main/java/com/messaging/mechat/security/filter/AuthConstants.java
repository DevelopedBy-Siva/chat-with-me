package com.messaging.mechat.security.filter;

import java.time.temporal.ChronoUnit;

public class AuthConstants {

    public static final String authenticatedApi_mapping = "/auth";
    public static final String authenticatedApi_exp = "/auth/*";

    protected static final long defaultTokenExpiryPeriod = 10;
    protected static final ChronoUnit defaultTokenExpiryPeriodUnit = ChronoUnit.MINUTES;

    protected static final String authHeader_key = "Authorization";
    protected static final String authHeader_tokenPrefix = "Bearer ";
    protected static final String authEmail_key = "email";
    protected static final String authPassword_key = "password";

    protected static String jwtSecret_key = "auth.jwt.secret.key";
    protected static String accessTokenExpiresAt_key = "auth.access.token.expiry.exp";
    protected static String refreshTokenExpiresAt_key = "auth.refresh.token.expiry.exp";

    public enum AccessErrorCode {
        JWT_TOKEN_EXPIRED("Access denied. JWT token expired"),
        JWT_TOKEN_INVALID("Access denied. Invalid JWT token"),
        ACCESS_FORBIDDEN("You don't have the permission to access"),
        ERR_USR_UNAUTHORIZED("User is unauthorized"),
        ERR_USR_NOT_FOUND("User not found"),
        ERR_USR_ALREADY_EXISTS("User already registered"),
        ERR_USR_REGISTRATION_FAILED("Failed to register the user. Try again"),
        METHOD_NOT_SUPPORTED("Method not supported"),
        ERR_PAGE_NOT_FOUND("Page that you are looking for is not found");

        public final String message;

        AccessErrorCode(String message) {
            this.message = message;
        }
    }
}
