package com.messaging.mechat.controller;

import com.messaging.mechat.service.PassThroughService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PublicController {

    private final PassThroughService service;

    @PostMapping("/sign-up")
    public String signup() {
        // TODO
        return "SIGNED UP";
    }

    @PostMapping("/forgot-pswd")
    public String forgotPswd() {
        // TODO
        return "FORGOT PSWD";
    }

}
