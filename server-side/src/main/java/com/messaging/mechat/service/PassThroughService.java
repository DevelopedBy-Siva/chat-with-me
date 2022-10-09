package com.messaging.mechat.service;

import com.messaging.mechat.model.JwtTokens;
import com.messaging.mechat.model.UserInformationResponse;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

public interface PassThroughService {

    UserInformationResponse getInfo();

    void registerUser(Map<String, String> user);

    JwtTokens getTokens(HttpServletRequest request) throws IOException;
}
