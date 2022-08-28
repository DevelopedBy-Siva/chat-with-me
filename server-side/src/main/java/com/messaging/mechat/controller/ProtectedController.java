package com.messaging.mechat.controller;

import com.messaging.mechat.model.UserInformationResponse;
import com.messaging.mechat.service.PassthroughService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class ProtectedController {

    @Autowired
    private PassthroughService service;

    @GetMapping("/info")
    public UserInformationResponse getInformation(){
        return service.getInfo();
    }

}
