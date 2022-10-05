package com.messaging.mechat.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
public class CustomAuthFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final long defaultTokenExpiryPeriod = 10;
    private final ChronoUnit defaultTokenExpiryPeriodUnit = ChronoUnit.MINUTES;
    @Value("${auth.jwt.secret.key}")
    private String jwtSecret;
    @Value("${auth.jwt.expiry.exp}")
    private String jwtExpiresAt;
    @Value("${auth.refresh.token.expiry.exp}")
    private String refreshTokenExpiresAt;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        log.info("Email: {}, Password: {}", email, password);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret.getBytes());
        String accessToken = JWT.create().withSubject(user.getUsername()).withExpiresAt(getTokenExpireTime(jwtExpiresAt)).withIssuer(request.getRequestURI()).sign(algorithm);
        String refreshToken = JWT.create().withSubject(user.getUsername()).withExpiresAt(getTokenExpireTime(refreshTokenExpiresAt)).withIssuer(request.getRequestURI()).sign(algorithm);
        response.setHeader("access_token", accessToken);
        response.setHeader("refresh_token", refreshToken);
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
}
