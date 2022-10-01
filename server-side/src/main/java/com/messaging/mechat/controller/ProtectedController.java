package com.messaging.mechat.controller;

import com.messaging.mechat.model.UserInformationResponse;
import com.messaging.mechat.service.PassThroughService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class ProtectedController {

    private final PassThroughService service;

    @GetMapping("/info")
    public UserInformationResponse getInformation() {
        return service.getInfo();
    }

}
