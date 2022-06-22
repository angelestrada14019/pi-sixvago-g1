package com.example.proyectoIntegrador.config;



import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import com.example.proyectoIntegrador.utils.WrapperResponse;
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
        WrapperResponse<?> response= new WrapperResponse<>(false,HttpStatus.INTERNAL_SERVER_ERROR,"Internal_Server_Error",null);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(ValidateServiceExceptions.class)
    public ResponseEntity<?> ValidateServiceExceptions(ValidateServiceExceptions e, WebRequest request){
        log.error(e.getMessage(),e);
        WrapperResponse<?> response= new WrapperResponse<>(false,HttpStatus.NO_CONTENT,e.getMessage(),null);
        return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
    }
    @ExceptionHandler(NoDataFoundExceptions.class)
    public ResponseEntity<?> NoDataFoundExceptions(NoDataFoundExceptions e, WebRequest request){
        log.error(e.getMessage(),e);
        WrapperResponse<?> response= new WrapperResponse<>(false,HttpStatus.NOT_FOUND,e.getMessage(),null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(GeneralServicesExceptions.class)
    public ResponseEntity<?> GeneralServicesExceptions(GeneralServicesExceptions e, WebRequest request){
        log.error(e.getMessage(),e);
        WrapperResponse<?> response= new WrapperResponse<>(false,HttpStatus.INTERNAL_SERVER_ERROR,"Internal_Server_Error",null);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
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
        WrapperResponse<?> response= new WrapperResponse<>(false,HttpStatus.BAD_REQUEST,errores.toString(),null);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
