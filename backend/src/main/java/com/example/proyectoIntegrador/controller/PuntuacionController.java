package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.PuntuacionDTO;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.service.implementacion.PuntuacionService;
import com.example.proyectoIntegrador.utils.WrapperResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/puntuacion")
@CrossOrigin(origins = "*")
public class PuntuacionController {

    @Autowired
    private PuntuacionService puntuacionService;

    @GetMapping("/{id}")
    public ResponseEntity<WrapperResponse<PuntuacionDTO>> buscar(@PathVariable Long id) {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",puntuacionService.buscar(id)).createResponse(HttpStatus.OK);
    }@GetMapping("/usuario/{id}")
    public ResponseEntity<WrapperResponse<List<PuntuacionDTO>>> buscarPorUsuarioId(@PathVariable Long id) {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",puntuacionService.findByUsuarioId(id)).createResponse(HttpStatus.OK);
    }
    @PutMapping()
    public ResponseEntity<WrapperResponse<PuntuacionDTO>> editar(@RequestBody PuntuacionDTO puntuacionDTO) {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",puntuacionService.editar(puntuacionDTO)).createResponse(HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<WrapperResponse<String>>  eliminar(@PathVariable Long id) {
        if (puntuacionService.buscar(id) != null) {
            puntuacionService.eliminar(id);
        } else {
            throw new NoDataFoundExceptions("no existe la puntuacion con ese id");
        }
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes","eliminado").createResponse(HttpStatus.OK);
    }
    @GetMapping()
    public ResponseEntity<WrapperResponse<List<PuntuacionDTO>>> listarTodos(){
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",puntuacionService.listarTodos()).createResponse(HttpStatus.OK);

    }
    @PostMapping()
    public ResponseEntity<WrapperResponse<PuntuacionDTO>> agregar(@RequestBody PuntuacionDTO puntuacionDTO){
        return  new WrapperResponse<>(true,HttpStatus.CREATED,"Succes",puntuacionService.agregar(puntuacionDTO)).createResponse(HttpStatus.CREATED);
    }

}
