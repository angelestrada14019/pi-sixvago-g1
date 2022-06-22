package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.CaracteristicasDTO;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.service.implementacion.CaracteristicasService;
import com.example.proyectoIntegrador.utils.WrapperResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/caracteristicas")
@CrossOrigin(origins = "*")
public class CaracteristicasController {

    @Autowired
    private CaracteristicasService caracteristicasService;

    @GetMapping("/{id}")
    public ResponseEntity<WrapperResponse<CaracteristicasDTO>> buscar(@PathVariable Long id)  {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",caracteristicasService.buscar(id)).createResponse(HttpStatus.OK);
    }
    @GetMapping()
    public ResponseEntity<WrapperResponse<List<CaracteristicasDTO>>> listarTodos(){
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",caracteristicasService.listarTodos()).createResponse(HttpStatus.OK);
    }
    @PostMapping()
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<WrapperResponse<CaracteristicasDTO>> agregar(@RequestBody CaracteristicasDTO caracteristicasDTO) {
        return  new WrapperResponse<>(true,HttpStatus.CREATED,"Succes",caracteristicasService.agregar(caracteristicasDTO)).createResponse(HttpStatus.CREATED);
    }
    @PutMapping()
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<WrapperResponse<CaracteristicasDTO>> editar(@RequestBody CaracteristicasDTO caracteristicasDTO) {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",caracteristicasService.editar(caracteristicasDTO)).createResponse(HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<WrapperResponse<String>> eliminar(@PathVariable Long id)  {
        if (caracteristicasService.buscar(id) != null) {
            caracteristicasService.eliminar(id);
        } else {
            throw new NoDataFoundExceptions("No se encuentra caracteristica con ese id");
        }
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes","eliminado").createResponse(HttpStatus.OK);

    }


}
