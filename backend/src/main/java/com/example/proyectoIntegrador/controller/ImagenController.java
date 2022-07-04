package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.ImagenDTO;
import com.example.proyectoIntegrador.dto.ReservaDTO;
import com.example.proyectoIntegrador.service.implementacion.ImagenService;
import com.example.proyectoIntegrador.utils.WrapperResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/imagenes")
@CrossOrigin(origins = "*")
public class ImagenController {

    @Autowired
    private ImagenService imagenService;

    @PostMapping()
    @PreAuthorize("hasAnyRole('admin')")
    public ResponseEntity<WrapperResponse<ImagenDTO>> agregar(@RequestBody ImagenDTO imagenDTO){
        return  new WrapperResponse<>(true, HttpStatus.CREATED,"Succes",imagenService.agregar(imagenDTO)).createResponse(HttpStatus.CREATED);
    }
}
