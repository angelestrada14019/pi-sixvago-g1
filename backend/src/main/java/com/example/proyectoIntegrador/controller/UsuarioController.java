package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.exceptions.BadRequestException;
import com.example.proyectoIntegrador.service.implementacion.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping()
    public ResponseEntity listarTodos(){
        return ResponseEntity.ok(usuarioService.listarTodos());
    }
    @GetMapping("/{email}")
    public ResponseEntity findUsuarioByEmail(@PathVariable String email) throws BadRequestException {
        return ResponseEntity.ok(usuarioService.findUsuarioByEmail(email));
    }
}
