package com.messaging.mechat.exception;

public enum ErrorCode {
    UNKNOWN_ERROR("Unknown Exception occurred"),
    METHOD_NOT_SUPPORTED("Method not supported"),
    ERR_PAGE_NOT_FOUND("Page that you are looking for is not found"),
    ERR_INVALID_REQUEST("The request is invalid");

    public final String message;

    ErrorCode(String message) {
        this.message = message;
    }
}
