package com.messaging.mechat.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.messaging.mechat.exception.MeChatException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Map;
import java.util.Objects;

import static com.messaging.mechat.exception.ErrorCode.ERR_INVALID_REQUEST;

@ToString
@Getter
@Setter
@Slf4j
@NoArgsConstructor
public class UserRegistration {

    @NotEmpty
    @Size(min = 3, max = 25)
    String name;
    @NotEmpty
    @Email
    String email;
    @NotEmpty
    @Size(min = 8, max = 32)
    String password;
    @NotEmpty
    @Size(min = 10, max = 10, message = "invalid phone number")
    String phone;

    public UserRegistration(ObjectMapper mapper, Map<String, String> request) {

        UserRegistration userRegistration;
        try {
            userRegistration = mapper.convertValue(request, UserRegistration.class);
            if (Objects.isNull(userRegistration))
                throw new NullPointerException("UserRegistration object is null");
        } catch (Exception ex) {
            log.error("Error invalid request: {}", ex.getMessage());
            throw new MeChatException(ERR_INVALID_REQUEST, ERR_INVALID_REQUEST.message, HttpStatus.BAD_REQUEST);
        }
        this.name = userRegistration.getName();
        this.email = userRegistration.getEmail();
        this.phone = userRegistration.getPhone();
        this.password = userRegistration.getPassword();
    }

}
