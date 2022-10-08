package com.messaging.mechat.utils;

import com.messaging.mechat.model.UserRegistration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import java.util.Set;
import java.util.StringJoiner;

@Component
@Slf4j
@RequiredArgsConstructor
public class UserRequestValidations {

    private final Validator validator;

    public void validateRegisterRequest(UserRegistration request) {

        Set<ConstraintViolation<UserRegistration>> violations = validator.validate(request);
        if (!violations.isEmpty()) {
            StringJoiner error = new StringJoiner(", ");
            for (ConstraintViolation<UserRegistration> constraintViolation : violations)
                error.add(constraintViolation.getPropertyPath() + ": " + constraintViolation.getMessage());
            throw new ConstraintViolationException("Invalid field(s):- " + error, violations);
        }
    }

}
