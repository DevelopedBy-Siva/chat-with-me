package com.messaging.mechat.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.messaging.mechat.security.filter.CustomAuthenticationFilter;
import com.messaging.mechat.security.filter.CustomAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.messaging.mechat.constants.AuthConstants.authenticatedApi_exp;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final ObjectMapper objectMapper;
    private final Environment environment;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(bCryptPasswordEncoder);
        authProvider.setHideUserNotFoundExceptions(false);
        auth.authenticationProvider(authProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers(authenticatedApi_exp).authenticated();
        http.addFilter(authenticationFilter());
        http.addFilterBefore(authorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    private CustomAuthenticationFilter authenticationFilter() throws Exception {
        return new CustomAuthenticationFilter(authenticationManagerBean(), objectMapper, environment);
    }

    private CustomAuthorizationFilter authorizationFilter() throws Exception {
        return new CustomAuthorizationFilter(environment, objectMapper);
    }
}
