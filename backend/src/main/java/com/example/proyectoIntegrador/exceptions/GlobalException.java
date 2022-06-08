package com.example.proyectoIntegrador.exceptions;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {
    private static final Logger logger = Logger.getLogger(GlobalException.class);

    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<String> procesarErrorBadRequest(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
@ExceptionHandler( {AuthenticationException.class } )
    public ResponseEntity<String> processAuthenticacion( AuthenticationException exception) {
        logger.error("AuthenticationException",exception);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exception.getMessage());
    }

}
