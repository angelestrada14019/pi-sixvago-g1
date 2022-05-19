package com.example.proyectoIntegrador.service;

import com.example.proyectoIntegrador.dto.CategoriaDTO;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public interface ICategoriaService {


    CategoriaDTO agregarCategoria(CategoriaDTO categoriaDTO);

    CategoriaDTO editarCategoria(CategoriaDTO categoriaDTO);

    Set<CategoriaDTO> listarTodos();

    void eliminarCategoria(Long id);




}
