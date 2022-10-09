package com.messaging.mechat.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtTokens {
    private final String accessToken;
    private final String refreshToken;
    private final String type = "Bearer";
}
