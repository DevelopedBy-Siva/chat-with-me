package com.messaging.mechat.security;

import java.time.temporal.ChronoUnit;

public class SecurityConstants {

    protected static final long defaultTokenExpiryPeriod = 10;
    protected static final ChronoUnit defaultTokenExpiryPeriodUnit = ChronoUnit.MINUTES;

    protected static final String authEmail_key= "email";
    protected static final String authPassword_key= "password";
    protected static final String accessToken_key= "access_token";
    protected static final String refreshToken_key= "refresh_token";

    protected static String jwtSecret_key = "auth.jwt.secret.key";
    protected static String accessTokenExpiresAt_key = "auth.access.token.expiry.exp";
    protected static String refreshTokenExpiresAt_key = "auth.refresh.token.expiry.exp";
}
