package com.messaging.mechat.exception;

public enum ErrorCode {
    UNKNOWN_ERROR("Unknown Exception occurred"),
    ERR_INVALID_REQUEST("The request is invalid"),
    JWT_TOKEN_EXPIRED("Access denied. JWT token expired"),
    JWT_TOKEN_INVALID("Access denied. Invalid JWT token"),
    ACCESS_FORBIDDEN("You don't have the permission to access"),
    ERR_USR_UNAUTHORIZED("User is unauthorized"),
    ERR_USR_NOT_FOUND("User not found"),
    ERR_USR_ALREADY_EXISTS("User already registered"),
    ERR_USR_REGISTRATION_FAILED("Failed to register the user. Try again"),
    METHOD_NOT_SUPPORTED("Method not supported"),
    ERR_PAGE_NOT_FOUND("Page that you are looking for is not found");

    public final String message;

    ErrorCode(String message) {
        this.message = message;
    }
}
