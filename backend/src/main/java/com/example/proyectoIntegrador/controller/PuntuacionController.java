package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.PuntuacionDTO;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
import com.example.proyectoIntegrador.service.implementacion.PuntuacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/puntuacion")
@CrossOrigin(origins = "*")
public class PuntuacionController {

    @Autowired
    private PuntuacionService puntuacionService;

    @GetMapping("/{id}")
    public ResponseEntity buscar(@PathVariable Long id) throws BadRequestException {
        return ResponseEntity.ok(puntuacionService.buscar(id));
    }
    @PutMapping()
    public ResponseEntity editar(@RequestBody PuntuacionDTO puntuacionDTO) throws BadRequestException {
        return ResponseEntity.ok(puntuacionService.editar(puntuacionDTO));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id) throws BadRequestException {
        ResponseEntity<String> response = null;
        if (puntuacionService.buscar(id) != null) {
            puntuacionService.eliminar(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Eliminado");
        } else {
            throw new BadRequestException("no existe la puntuacion con ese id");
        }
        return response;
    }
    @GetMapping()
    public ResponseEntity listarTodos(){
        return ResponseEntity.ok(puntuacionService.listarTodos());
    }
    @PostMapping()
    public ResponseEntity agregar(@RequestBody PuntuacionDTO puntuacionDTO) throws BadRequestException{
        return ResponseEntity.status(HttpStatus.CREATED).body(puntuacionService.agregar(puntuacionDTO));
    }
    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> procesarErrorBadRequest(BadRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
