package com.messaging.mechat.service;

import com.messaging.mechat.model.JwtTokens;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

public interface UserService {

    void registerUser(Map<String, String> request);

    JwtTokens generateJwtTokens(HttpServletRequest request) throws IOException;

}
