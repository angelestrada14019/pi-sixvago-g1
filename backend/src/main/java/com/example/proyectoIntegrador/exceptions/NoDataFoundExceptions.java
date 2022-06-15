package com.example.proyectoIntegrador.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NO_CONTENT)
public class NoDataFoundExceptions extends RuntimeException{
    public NoDataFoundExceptions() {
    }

    public NoDataFoundExceptions(String message) {
        super(message);
    }

    public NoDataFoundExceptions(String message, Throwable cause) {
        super(message, cause);
    }

    public NoDataFoundExceptions(Throwable cause) {
        super(cause);
    }

    public NoDataFoundExceptions(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
