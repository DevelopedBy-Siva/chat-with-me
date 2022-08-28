package com.messaging.mechat.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDetails unhandledExceptions(Exception ex) {
        logger.error("Unknown error occurred: {}", ex.getMessage(), ex.getStackTrace());
        return new ErrorDetails(ErrorCode.UNKNOWN_ERROR, ErrorCode.UNKNOWN_ERROR.message);
    }

    @ExceptionHandler(MeChatException.class)
    public ResponseEntity<ErrorDetails> unhandledExceptions(MeChatException ex) {
        logger.error("MeChatException occurred: {}", ex.getMessage(), ex.getStackTrace());
        return new ResponseEntity<>(ex.getError(), ex.getStatus());
    }

}
