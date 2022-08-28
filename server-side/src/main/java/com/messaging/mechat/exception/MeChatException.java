package com.messaging.mechat.exception;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@ToString
@Getter
@Setter
public class MeChatException extends RuntimeException {

    private HttpStatus status;
    private ErrorDetails error;

    public MeChatException(ErrorCode errorCode, String errorDescription, HttpStatus status) {
        super();
        this.status = status;
        error = new ErrorDetails(errorCode, errorDescription);
    }

}
