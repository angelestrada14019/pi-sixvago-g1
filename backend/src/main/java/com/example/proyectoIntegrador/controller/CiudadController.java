package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.CiudadDTO;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.service.implementacion.CiudadService;
import com.example.proyectoIntegrador.utils.WrapperResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ciudades")
@CrossOrigin(origins = "*")
public class CiudadController {

    @Autowired
    private CiudadService ciudadService;

    @GetMapping("/{id}")
    public ResponseEntity<WrapperResponse<CiudadDTO>> buscar(@PathVariable Long id) {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",ciudadService.buscar(id)).createResponse(HttpStatus.OK);
    }
    @PutMapping()
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<WrapperResponse<CiudadDTO>>  editar(@RequestBody CiudadDTO ciudadDTO) {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",ciudadService.editar(ciudadDTO)).createResponse(HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<WrapperResponse<String>>  eliminar(@PathVariable Long id) {
        if (ciudadService.buscar(id) != null) {
            ciudadService.eliminar(id);
        } else {
            throw new NoDataFoundExceptions("no existe ciudad con ese id");
        }
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes","eliminado").createResponse(HttpStatus.OK);
    }
    @GetMapping()
    public ResponseEntity<WrapperResponse<List<CiudadDTO>>>  listarTodos(){
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",ciudadService.listarTodos()).createResponse(HttpStatus.OK);

    }
    @PostMapping()
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<WrapperResponse<CiudadDTO>>  agregar(@RequestBody CiudadDTO ciudadDTO){
        return  new WrapperResponse<>(true,HttpStatus.CREATED,"Succes",ciudadService.agregar(ciudadDTO)).createResponse(HttpStatus.CREATED);
    }

}
