package com.messaging.mechat.exception;

public enum ErrorCode {
    UNKNOWN_ERROR("Unknown Exception occurred"),
    ERR_INVALID_REQUEST("The request is invalid");

    public final String message;

    ErrorCode(String message) {
        this.message = message;
    }
}
