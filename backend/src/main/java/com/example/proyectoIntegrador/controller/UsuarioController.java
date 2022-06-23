package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.ReservaDTO;
import com.example.proyectoIntegrador.dto.UsuarioDTO;
import com.example.proyectoIntegrador.service.implementacion.UsuarioService;
import com.example.proyectoIntegrador.utils.WrapperResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private ObjectMapper mapper;

    @GetMapping()
    public ResponseEntity<WrapperResponse<List<UsuarioDTO>>> listarTodos(){
        return  new WrapperResponse<>(true, HttpStatus.OK,"Succes",usuarioService.listarTodos()).createResponse(HttpStatus.OK);
    }
    @GetMapping("/{email}")
    public ResponseEntity<WrapperResponse<UsuarioDTO>> findUsuarioByEmail(@PathVariable String email) {
        return  new WrapperResponse<>(true, HttpStatus.OK,"Succes",mapper.convertValue(usuarioService.findUsuarioByEmail(email),UsuarioDTO.class)).createResponse(HttpStatus.OK);
    }
    @PutMapping()
    @PreAuthorize("hasAnyRole('admin','cliente')")
    public ResponseEntity<WrapperResponse<UsuarioDTO>> editar(@RequestBody UsuarioDTO usuarioDTO)  {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",usuarioService.editar(usuarioDTO)).createResponse(HttpStatus.OK);
    }
}
