package com.messaging.mechat.exception;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class ErrorDetails {

    private String errorCode;
    private String errorDescription;

    public ErrorDetails(String errorCode, String errorDescription) {
        super();
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
    }
}
