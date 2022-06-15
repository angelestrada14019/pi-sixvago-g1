package com.example.proyectoIntegrador.config;



import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;


@Slf4j
@ControllerAdvice
public class ErrorHandlerConfig extends ResponseEntityExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> all(Exception e, WebRequest request){
        log.error(e.getMessage(),e);
        return new ResponseEntity<>("internal error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(ValidateServiceExceptions.class)
    public ResponseEntity<?> ValidateServiceExceptions(ValidateServiceExceptions e, WebRequest request){
        log.error(e.getMessage(),e);
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NO_CONTENT);
    }
    @ExceptionHandler(NoDataFoundExceptions.class)
    public ResponseEntity<?> NoDataFoundExceptions(NoDataFoundExceptions e, WebRequest request){
        log.error(e.getMessage(),e);
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(GeneralServicesExceptions.class)
    public ResponseEntity<?> GeneralServicesExceptions(GeneralServicesExceptions e, WebRequest request){
        log.error(e.getMessage(),e);
        return new ResponseEntity<>("Internal_Server_Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatus status, WebRequest request) {
        Map<String, String> errores=new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((objectError -> { //obtener todos los errores
            String nombreCampo=((FieldError)objectError).getField(); //nombre del campo del error donde ocurre
            String mensaje=objectError.getDefaultMessage();
            errores.put(nombreCampo,mensaje);
            log.error(errores.toString());
        }));
        return new ResponseEntity<>(errores.toString(), HttpStatus.BAD_REQUEST);
    }
}
