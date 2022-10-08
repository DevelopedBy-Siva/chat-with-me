package com.messaging.mechat.service.impl;

import com.messaging.mechat.model.UserInformationResponse;
import com.messaging.mechat.service.ChatService;
import com.messaging.mechat.service.PassThroughService;
import com.messaging.mechat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class PassThroughServiceImpl implements PassThroughService {

    private final UserService userService;
    private final ChatService chatService;

    public UserInformationResponse getInfo() {
        UserInformationResponse resp = new UserInformationResponse();
        resp.setName("SIVA");
        return resp;
    }

    @Override
    public void registerUser(Map<String, String> user) {
        userService.registerUser(user);
    }

}
