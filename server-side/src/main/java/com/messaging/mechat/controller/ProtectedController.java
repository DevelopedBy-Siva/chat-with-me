package com.messaging.mechat.controller;

import com.messaging.mechat.model.JwtTokens;
import com.messaging.mechat.model.UserInformationResponse;
import com.messaging.mechat.service.PassThroughService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import static com.messaging.mechat.constants.AuthConstants.authenticatedApi_mapping;

@RestController
@RequestMapping(authenticatedApi_mapping)
@RequiredArgsConstructor
public class ProtectedController {

    private final PassThroughService service;

    @GetMapping("/info")
    public UserInformationResponse getInformation() {
        return service.getInfo();
    }

    @GetMapping("/token/refresh")
    public JwtTokens getTokens(HttpServletRequest request) throws IOException {
        return service.getTokens(request);
    }

}
