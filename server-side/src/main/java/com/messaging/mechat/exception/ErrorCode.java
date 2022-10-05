package com.messaging.mechat.exception;

public enum ErrorCode {
    UNKNOWN_ERROR("Unknown Exception occurred"),
    METHOD_NOT_SUPPORTED("Method not supported"),
    ACCESS_FORBIDDEN("You don't have the permission to access"),
    ERR_PAGE_NOT_FOUND("Page that you are looking for is not found"),
    ERR_USR_UNAUTHORIZED("User is unauthorized"),
    ERR_USR_NOT_FOUND("User not found"),
    ERR_USR_ALREADY_EXISTS("User already registered"),
    ERR_INVALID_REQUEST("The request is invalid");

    public final String message;

    ErrorCode(String message) {
        this.message = message;
    }
}
