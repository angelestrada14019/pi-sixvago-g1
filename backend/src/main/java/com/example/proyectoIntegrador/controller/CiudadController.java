package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.CiudadDTO;
import com.example.proyectoIntegrador.dto.ProductoDTO;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
import com.example.proyectoIntegrador.service.implementacion.CiudadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ciudades")
@CrossOrigin(origins = "*")
public class CiudadController {

    @Autowired
    private CiudadService ciudadService;

    @GetMapping("/{id}")
    public ResponseEntity buscar(@PathVariable Long id) throws BadRequestException {
        return ResponseEntity.ok(ciudadService.buscar(id));
    }
    @PutMapping()
    public ResponseEntity editar(@RequestBody CiudadDTO ciudadDTO) throws BadRequestException {
        return ResponseEntity.ok(ciudadService.editar(ciudadDTO));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id) throws BadRequestException {
        ResponseEntity<String> response = null;
        if (ciudadService.buscar(id) != null) {
            ciudadService.eliminar(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Eliminado");
        } else {
            throw new BadRequestException("no existe ciudad con ese id");
        }
        return response;
    }
    @GetMapping()
    public ResponseEntity listarTodos(){
        return ResponseEntity.ok(ciudadService.listarTodos());
    }
    @PostMapping()
    public ResponseEntity agregar(@RequestBody CiudadDTO ciudadDTO) throws BadRequestException{
        return ResponseEntity.ok(ciudadService.agregar(ciudadDTO));
    }
    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> procesarErrorBadRequest(BadRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
