package com.messaging.mechat.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.messaging.mechat.exception.ErrorCode;
import com.messaging.mechat.exception.ErrorDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@Controller
@RequiredArgsConstructor
public class CustomErrorController implements ErrorController {

    private final ObjectMapper objectMapper;

    @RequestMapping("/error")
    @ResponseBody
    public String handleError(HttpServletRequest request) throws JsonProcessingException {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        ErrorDetails error = null;
        if (Objects.nonNull(status)) {
            Integer statusCode = Integer.valueOf(status.toString());
            if (statusCode == HttpStatus.NOT_FOUND.value())
                error = new ErrorDetails(ErrorCode.ERR_PAGE_NOT_FOUND, ErrorCode.ERR_PAGE_NOT_FOUND.message);
            else if (statusCode == HttpStatus.UNAUTHORIZED.value())
                error = new ErrorDetails(ErrorCode.ERR_USR_UNAUTHORIZED, ErrorCode.ERR_USR_UNAUTHORIZED.message);
        }
        if (Objects.isNull(error))
            error = new ErrorDetails(ErrorCode.ACCESS_FORBIDDEN, ErrorCode.ACCESS_FORBIDDEN.message);
        return objectMapper.writeValueAsString(error);
    }

}
