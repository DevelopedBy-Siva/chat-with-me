package com.messaging.mechat.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

import static com.messaging.mechat.constants.AuthConstants.*;
import static com.messaging.mechat.utils.JwtTokenUtils.handleJwtTokenErrors;

@RequiredArgsConstructor
@Slf4j
public class CustomAuthorizationFilter extends OncePerRequestFilter {

    private final Environment environment;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getServletPath().startsWith(authenticatedApi_mapping)) {
            String authorizationHeader = request.getHeader(authHeader_key);
            if (Objects.nonNull(authorizationHeader) && authorizationHeader.startsWith(authHeader_tokenPrefix)) {
                try {
                    String token = authorizationHeader.substring(authHeader_tokenPrefix.length());
                    Algorithm algorithm = Algorithm.HMAC256(environment.getProperty(jwtSecret_key).getBytes());
                    JWTVerifier verifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = verifier.verify(token);
                    String username = decodedJWT.getSubject();
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, null, null);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(request, response);
                } catch (Exception ex) {
                    handleJwtTokenErrors(ex, response, objectMapper);
                }
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
