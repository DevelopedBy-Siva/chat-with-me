package com.messaging.mechat.service;

import com.messaging.mechat.model.UserInformationResponse;

import java.util.Map;

public interface PassThroughService {

    UserInformationResponse getInfo();

    void registerUser(Map<String, String> user);

}
