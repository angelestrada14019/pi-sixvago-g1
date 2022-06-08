package com.example.proyectoIntegrador.service;

import com.example.proyectoIntegrador.dto.CategoriaDTO;
import com.example.proyectoIntegrador.dto.CiudadDTO;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface IGeneralService<E, ID> {


    E agregar(E e) throws BadRequestException;

    E buscar(ID id) throws BadRequestException;

    E editar(E e) throws BadRequestException;

    List<E>listarTodos();
    void eliminar(ID id) throws BadRequestException;




}
