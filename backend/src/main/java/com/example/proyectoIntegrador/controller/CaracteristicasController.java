package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.CaracteristicasDTO;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
import com.example.proyectoIntegrador.service.implementacion.CaracteristicasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicasController {

    @Autowired
    private CaracteristicasService caracteristicasService;

    @GetMapping("/{id}")
    public ResponseEntity buscar(@PathVariable Long id) throws BadRequestException {
        return ResponseEntity.ok(caracteristicasService.buscar(id));
    }
    @GetMapping()
    public ResponseEntity listarTodos(){
        return ResponseEntity.ok(caracteristicasService.listarTodos());
    }
    @PostMapping()
    public ResponseEntity agregar(@RequestBody CaracteristicasDTO caracteristicasDTO) throws BadRequestException {
        return new ResponseEntity<CaracteristicasDTO>(caracteristicasService.agregar(caracteristicasDTO), HttpStatus.CREATED);
    }
    @PutMapping()
    public ResponseEntity editar(@RequestBody CaracteristicasDTO caracteristicasDTO) throws BadRequestException {
        return ResponseEntity.ok(caracteristicasService.editar(caracteristicasDTO));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id) throws BadRequestException {
        ResponseEntity<String> response = null;
        if (caracteristicasService.buscar(id) != null) {
            caracteristicasService.eliminar(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Eliminado");
        } else {
            throw new BadRequestException("No se encuentra caracteristica con ese id");
        }
        return response;
    }
    @ExceptionHandler
    public ResponseEntity<String> handleException(BadRequestException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

}
