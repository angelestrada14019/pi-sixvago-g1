package com.example.proyectoIntegrador.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IGeneralService<E, ID> {


    E agregar(E e) ;

    E buscar(ID id) ;

    E editar(E e) ;

    List<E>listarTodos();
    void eliminar(ID id);




}
