package com.messaging.mechat.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDetails unhandledExceptions(Exception ex) {
        logger.error("Unknown error occurred: {}", ex.getMessage());
        if (logger.isDebugEnabled())
            logger.debug("Unknown error occurred: {}, stackTrace: {}", ex.getMessage(), ex.getStackTrace());
        return new ErrorDetails(ErrorCode.UNKNOWN_ERROR.toString(), ErrorCode.UNKNOWN_ERROR.message);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDetails methodNotSupportedExceptions(Exception ex) {
        logger.error("Method not supported error occurred: {}", ex.getMessage());
        return new ErrorDetails(ErrorCode.METHOD_NOT_SUPPORTED.toString(), ex.getMessage());
    }

    @ExceptionHandler(MeChatException.class)
    public ResponseEntity<ErrorDetails> meChatExceptions(MeChatException ex) {
        logger.error("MeChatException occurred: {}", ex.getMessage());
        if (logger.isDebugEnabled())
            logger.debug("MeChatException occurred: {}, stackTrace: {}", ex.getMessage(), ex.getStackTrace());
        return new ResponseEntity<>(ex.getError(), ex.getStatus());
    }

}
