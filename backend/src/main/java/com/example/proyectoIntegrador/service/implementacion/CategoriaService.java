package com.example.proyectoIntegrador.service.implementacion;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.proyectoIntegrador.dto.CategoriaDTO;
import com.example.proyectoIntegrador.entity.Categoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.proyectoIntegrador.repository.ICategoriaRepository;
import com.example.proyectoIntegrador.service.ICategoriaService;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class CategoriaService implements ICategoriaService {

    private ICategoriaRepository repository;
    private ObjectMapper mapper;
    @Autowired
    public void CategoriaService(ICategoriaRepository repository, ObjectMapper mapper){
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public CategoriaDTO agregarCategoria(CategoriaDTO categoriaDTO) {
        Categoria categoria = mapper.convertValue(categoriaDTO,Categoria.class);
        return mapper.convertValue(repository.save(categoria), CategoriaDTO.class);
    }

    @Override
    public CategoriaDTO editarCategoria(CategoriaDTO categoriaDTO) {
        Categoria categoria = mapper.convertValue(categoriaDTO, Categoria.class);
        return mapper.convertValue(repository.save(categoria), CategoriaDTO.class);
    }

    @Override
    public Set<CategoriaDTO> listarTodos() {
        Set<CategoriaDTO> categoriaDTO = new HashSet<>();
        for(Categoria categoria : repository.findAll()){
            categoriaDTO.add(mapper.convertValue(categoria, CategoriaDTO.class));
        }
        return categoriaDTO;
    }

    @Override
    public void eliminarCategoria(Long id) {
        Optional<Categoria> categoria = repository.findById(id);
        if(categoria.isPresent())
            repository.deleteById(id);
    }
}

