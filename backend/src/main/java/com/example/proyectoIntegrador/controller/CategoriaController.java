package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.CategoriaDTO;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.proyectoIntegrador.service.implementacion.CategoriaService;

import java.util.Set;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;
    @Autowired
    public CategoriaController(CategoriaService categoriaService){
        this.categoriaService = categoriaService;
    }

    @PostMapping()
    public ResponseEntity<CategoriaDTO> agregar(@RequestBody CategoriaDTO categoriaDTO) throws BadRequestException {
        return ResponseEntity.ok(categoriaService.agregar(categoriaDTO));
    }
    @GetMapping("/{id}")
    public ResponseEntity buscar(@PathVariable Long id) throws BadRequestException {
        return ResponseEntity.ok(categoriaService.buscar(id));
    }

    @PutMapping()
    public ResponseEntity<CategoriaDTO> editar(@RequestBody CategoriaDTO categoriaDTO) throws BadRequestException{
        ResponseEntity<CategoriaDTO> response = null;
        if(categoriaDTO.getId() != null)
            response = ResponseEntity.ok(categoriaService.editar(categoriaDTO));
        else
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return response;
    }

    @GetMapping
    public ResponseEntity ListarTodos(){
        return ResponseEntity.ok(categoriaService.listarTodos());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id) throws BadRequestException{
        categoriaService.eliminar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Se ha eliminado la categoria ingresada");
    }

}
