package com.messaging.mechat.exception;

public enum ErrorCode {
    UNKNOWN_ERROR("Unknown Exception occurred"),
    USR_UNAUTHORIZED("User is unauthorized"),
    USR_ALREADY_EXISTS("User already registered"),
    INVALID_REQUEST("The request is invalid");

    public final String message;

    private ErrorCode(String message) {
        this.message = message;
    }
}
