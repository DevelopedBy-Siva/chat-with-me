package com.messaging.mechat.security.filter;

import java.time.temporal.ChronoUnit;

public class AuthConstants {

    public static final String authenticatedApi_mapping = "/auth";
    public static final String authenticatedApi_exp = "/auth/*";

    protected static final long defaultTokenExpiryPeriod = 10;
    protected static final ChronoUnit defaultTokenExpiryPeriodUnit = ChronoUnit.MINUTES;

    protected static final String errorMsg = "error_message";

    protected static final String authHeader_key = "Authorization";
    protected static final String authHeader_tokenPrefix = "Bearer ";
    protected static final String authEmail_key= "email";
    protected static final String authPassword_key= "password";
    protected static final String accessToken_key= "access_token";
    protected static final String refreshToken_key= "refresh_token";

    protected static String jwtSecret_key = "auth.jwt.secret.key";
    protected static String accessTokenExpiresAt_key = "auth.access.token.expiry.exp";
    protected static String refreshTokenExpiresAt_key = "auth.refresh.token.expiry.exp";

    public enum Access {
        JWT_TOKEN_EXPIRED("Access denied. JWT token expired"),
        JWT_TOKEN_INVALID("Access denied. Invalid JWT token"),
        ACCESS_FORBIDDEN("You don't have the permission to access"),
        ERR_USR_UNAUTHORIZED("User is unauthorized"),
        ERR_USR_NOT_FOUND("User not found"),
        ERR_USR_ALREADY_EXISTS("User already registered");

        public final String message;

        Access(String message) {
            this.message = message;
        }
    }
}
