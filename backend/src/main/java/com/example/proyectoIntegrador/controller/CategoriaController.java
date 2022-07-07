package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.CategoriaDTO;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.utils.WrapperResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.proyectoIntegrador.service.implementacion.CategoriaService;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;


    @PostMapping()
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<WrapperResponse<CategoriaDTO>> agregar(@RequestBody CategoriaDTO categoriaDTO)  {
        return  new WrapperResponse<>(true,HttpStatus.CREATED,"Succes",categoriaService.agregar(categoriaDTO)).createResponse(HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<WrapperResponse<CategoriaDTO>> buscar(@PathVariable Long id)   {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",categoriaService.buscar(id)).createResponse(HttpStatus.OK);
    }

    @PutMapping()
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<WrapperResponse<CategoriaDTO>> editar(@RequestBody CategoriaDTO categoriaDTO){
        CategoriaDTO categoriaDTO1=null;
        if(categoriaDTO.getId() != null){
            categoriaDTO1 = categoriaService.editar(categoriaDTO);}
        else throw new NoDataFoundExceptions("el cuerpo no tiene id");
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",categoriaDTO1).createResponse(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<WrapperResponse<List<CategoriaDTO>>> ListarTodos(){
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",categoriaService.listarTodos()).createResponse(HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<WrapperResponse<String>>  eliminar(@PathVariable Long id){
        categoriaService.eliminar(id);
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes","eliminado").createResponse(HttpStatus.OK);
    }

}
