package com.messaging.mechat.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicController {

    @PostMapping("/sign-up")
    public String signup() {
        // TODO
        return "SIGNED UP";
    }

    @PostMapping("/login")
    public String login() {
        // TODO
        return "LOGGED IN";
    }

    @PostMapping("/forgot-pswd")
    public String forgotPswd() {
        // TODO
        return "FORGOT PSWD";
    }

}
