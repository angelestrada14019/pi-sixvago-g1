package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.CategoriaDTO;
import com.example.proyectoIntegrador.dto.PoliticaDTO;
import com.example.proyectoIntegrador.dto.ProductoDTO;
import com.example.proyectoIntegrador.dto.TipoDePoliticaDTO;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.service.implementacion.PoliticaService;
import com.example.proyectoIntegrador.service.implementacion.ProductosService;
import com.example.proyectoIntegrador.utils.WrapperResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/politicas")
@CrossOrigin(origins = "*")
public class PoliticaController {
    @Autowired
    private PoliticaService politicaService;



    @PostMapping()
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<WrapperResponse<PoliticaDTO>> agregar(@RequestBody PoliticaDTO politicaDTO) {
        return new WrapperResponse<>(true, HttpStatus.CREATED, "Succes", politicaService.agregar(politicaDTO)).createResponse(HttpStatus.CREATED);
    }


    @PutMapping()
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<WrapperResponse<PoliticaDTO>> editar(@RequestBody PoliticaDTO politicaDTO) {
        return new WrapperResponse<>(true, HttpStatus.OK, "Succes", politicaService.editar(politicaDTO)).createResponse(HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<WrapperResponse<List<PoliticaDTO>>> ListarTodos(){
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",politicaService.listarTodos()).createResponse(HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<WrapperResponse<String>> eliminar(@PathVariable Long id) {
        if (politicaService.buscar(id) != null) {
            politicaService.eliminar(id);
        } else {
            throw new NoDataFoundExceptions("no existe politica con ese id");
        }
        return new WrapperResponse<>(true, HttpStatus.OK, "Succes", "eliminado").createResponse(HttpStatus.OK);

    }
}
