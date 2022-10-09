package com.messaging.mechat.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import static com.messaging.mechat.exception.ErrorCode.*;

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
                error = new ErrorDetails(ERR_PAGE_NOT_FOUND, ERR_PAGE_NOT_FOUND.message);
            else if (statusCode == HttpStatus.UNAUTHORIZED.value())
                error = new ErrorDetails(ERR_USR_UNAUTHORIZED, ERR_USR_UNAUTHORIZED.message);
        }
        if (Objects.isNull(error))
            error = new ErrorDetails(ACCESS_FORBIDDEN, ACCESS_FORBIDDEN.message);
        return objectMapper.writeValueAsString(error);
    }

}
