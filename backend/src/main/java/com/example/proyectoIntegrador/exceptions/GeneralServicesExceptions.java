package com.example.proyectoIntegrador.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
public class GeneralServicesExceptions extends RuntimeException{

    public GeneralServicesExceptions() {
    }

    public GeneralServicesExceptions(String message) {
        super(message);
    }

    public GeneralServicesExceptions(String message, Throwable cause) {
        super(message, cause);
    }

    public GeneralServicesExceptions(Throwable cause) {
        super(cause);
    }

    public GeneralServicesExceptions(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
