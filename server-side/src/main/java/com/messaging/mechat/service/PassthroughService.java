package com.messaging.mechat.service;

import com.messaging.mechat.model.UserInformationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PassthroughService {

    @Autowired
    private UserService userService;
    @Autowired
    private ChatService chatService;

    public UserInformationResponse getInfo() {
        UserInformationResponse resp = new UserInformationResponse();
        resp.setName("SIVA");
        return resp;
    }

}
