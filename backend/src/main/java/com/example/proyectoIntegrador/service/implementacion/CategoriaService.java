package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.exceptions.BadRequestException;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.proyectoIntegrador.dto.CategoriaDTO;
import com.example.proyectoIntegrador.entity.Categoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.proyectoIntegrador.repository.ICategoriaRepository;

import java.util.*;

@Service
public class CategoriaService implements IGeneralService<CategoriaDTO, Long> {

    private ICategoriaRepository repository;
    private ObjectMapper mapper;
    @Autowired
    public void CategoriaService(ICategoriaRepository repository, ObjectMapper mapper){
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public CategoriaDTO agregar(CategoriaDTO categoriaDTO) throws BadRequestException {
        Categoria categoria = mapper.convertValue(categoriaDTO,Categoria.class);
        return mapper.convertValue(repository.save(categoria), CategoriaDTO.class);
    }

    @Override
    public CategoriaDTO buscar(Long aLong) throws BadRequestException {
        Optional<Categoria> categoria = repository.findById(aLong);
        if(categoria.isPresent()){
            return mapper.convertValue(categoria.get(), CategoriaDTO.class);
        }
        throw new BadRequestException("No se encontro la categoria");
    }


    @Override
    public CategoriaDTO editar(CategoriaDTO categoriaDTO) throws BadRequestException {
        Categoria categoria = mapper.convertValue(categoriaDTO, Categoria.class);
        return mapper.convertValue(repository.save(categoria), CategoriaDTO.class);
    }

    @Override
    public List<CategoriaDTO> listarTodos() {
        List<CategoriaDTO> categorias = new ArrayList<>();
        List<Categoria> listaCategorias = repository.findAll();
        for(Categoria categoria : listaCategorias){
            categorias.add(mapper.convertValue(categoria, CategoriaDTO.class));
        }
        return categorias;
    }


    @Override
    public void eliminar(Long id) throws BadRequestException {
        Optional<Categoria> categoria = repository.findById(id);
        if(categoria.isPresent())
            repository.deleteById(id);
    }
}

