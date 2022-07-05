package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.TipoDePoliticaDTO;
import com.example.proyectoIntegrador.service.implementacion.TipoDePoliticaService;
import com.example.proyectoIntegrador.utils.WrapperResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tipoDePoliticas")
@CrossOrigin(origins = "*")
public class TipoPoliticaController {

    @Autowired
    private TipoDePoliticaService tipoDePoliticaService;

    @GetMapping
    public ResponseEntity<WrapperResponse<List<TipoDePoliticaDTO>>> ListarTodos(){
        return  new WrapperResponse<>(true, HttpStatus.OK,"Succes",tipoDePoliticaService.listarTodos()).createResponse(HttpStatus.OK);
    }
}
