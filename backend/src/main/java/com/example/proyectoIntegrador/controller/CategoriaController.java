package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.CategoriaDTO;
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
    public ResponseEntity<CategoriaDTO> agregarCategoria(@RequestBody CategoriaDTO categoriaDTO){
        return ResponseEntity.ok(categoriaService.agregarCategoria(categoriaDTO));
    }

    @PutMapping()
    public ResponseEntity<CategoriaDTO> editarCategoria(@RequestBody CategoriaDTO categoriaDTO){
        ResponseEntity<CategoriaDTO> response = null;
        if(categoriaDTO.getId() != null)
            response = ResponseEntity.ok(categoriaService.editarCategoria(categoriaDTO));
        else
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return response;
    }

    @GetMapping
    public ResponseEntity<Set<CategoriaDTO>> listarTodos(){
        return ResponseEntity.ok(categoriaService.listarTodos());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> eliminarCategoria(@PathVariable Long id){
        categoriaService.eliminarCategoria(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Se ha eliminado la categoria ingresada");
    }

}
