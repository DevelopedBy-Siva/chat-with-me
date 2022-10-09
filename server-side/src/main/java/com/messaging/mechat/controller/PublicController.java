package com.messaging.mechat.controller;

import com.messaging.mechat.service.PassThroughService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import static com.messaging.mechat.constants.AuthConstants.publicApi_mapping;

@RestController
@RequestMapping(publicApi_mapping)
@RequiredArgsConstructor
public class PublicController {

    private final PassThroughService service;

    @PostMapping("/sign-up")
    public void signup(@RequestHeader Map<String, String> request) {
        service.registerUser(request);
    }

    @PostMapping("/forgot-pswd")
    public String forgotPswd() {
        // TODO
        return "FORGOT PSWD";
    }

}
