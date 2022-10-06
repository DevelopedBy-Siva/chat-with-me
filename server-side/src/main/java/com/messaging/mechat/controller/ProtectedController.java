package com.messaging.mechat.controller;

import com.messaging.mechat.model.UserInformationResponse;
import com.messaging.mechat.service.PassThroughService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.messaging.mechat.security.filter.AuthConstants.authenticatedApi_mapping;

@RestController
@RequestMapping(authenticatedApi_mapping)
@RequiredArgsConstructor
public class ProtectedController {

    private final PassThroughService service;

    @GetMapping("/info")
    public UserInformationResponse getInformation() {
        return service.getInfo();
    }

}
