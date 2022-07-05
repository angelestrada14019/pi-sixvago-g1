package com.example.proyectoIntegrador.utils;

import lombok.*;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class WrapperResponse<T> {
    private boolean ok;
    private HttpStatus status;
    private String mensaje;
    private T body;

    public ResponseEntity<WrapperResponse<T>> createResponse(HttpStatus status){
        return new ResponseEntity<>(this,status);
    }
}
