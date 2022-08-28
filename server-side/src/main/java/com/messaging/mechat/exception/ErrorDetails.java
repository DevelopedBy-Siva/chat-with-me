package com.messaging.mechat.exception;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class ErrorDetails {

    private ErrorCode errorCode;
    private String errorDescription;

    public ErrorDetails(ErrorCode errorCode, String errorDescription) {
        super();
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
    }
}
