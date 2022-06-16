package com.example.proyectoIntegrador.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class ValidateServiceExceptions extends RuntimeException{

    public ValidateServiceExceptions() {
    }

    public ValidateServiceExceptions(String message) {
        super(message);
    }

    public ValidateServiceExceptions(String message, Throwable cause) {
        super(message, cause);
    }

    public ValidateServiceExceptions(Throwable cause) {
        super(cause);
    }

    public ValidateServiceExceptions(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
