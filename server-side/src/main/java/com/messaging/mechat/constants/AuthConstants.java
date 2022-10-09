package com.messaging.mechat.constants;

import java.time.temporal.ChronoUnit;

public class AuthConstants {

    public static final String authenticatedApi_mapping = "/auth";
    public static final String authenticatedApi_exp = "/auth/**";
    public static final String publicApi_mapping = "/pub";
    public static final String publicApi_exp = "/pub/**";
    public static final String refreshTokenApi_mapping = "/token/refresh";
    public static final String refreshTokenApi_exp = "/auth/token/refresh/**";

    public static final long defaultTokenExpiryPeriod = 10;
    public static final ChronoUnit defaultTokenExpiryPeriodUnit = ChronoUnit.MINUTES;

    public static final String authHeader_key = "Authorization";
    public static final String authHeader_tokenPrefix = "Bearer ";
    public static final String authEmail_key = "email";
    public static final String authPassword_key = "password";
    public static final String jwtRolesPlaceholder_key = "roles";
    public static String jwtSecret_key = "auth.jwt.secret.key";
    public static String accessTokenExpiresAt_key = "auth.access.token.expiry.exp";
    public static String refreshTokenExpiresAt_key = "auth.refresh.token.expiry.exp";
}
