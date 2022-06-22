package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.proyectoIntegrador.dto.CategoriaDTO;
import com.example.proyectoIntegrador.entity.Categoria;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.proyectoIntegrador.repository.ICategoriaRepository;

import java.util.*;

@Service
@Slf4j
public class CategoriaService implements IGeneralService<CategoriaDTO, Long> {

    @Autowired
    private ICategoriaRepository repository;
    @Autowired
    private ObjectMapper mapper;


    @Override
    public CategoriaDTO agregar(CategoriaDTO categoriaDTO) {
        try {
            Categoria categoria = mapper.convertValue(categoriaDTO, Categoria.class);
            return mapper.convertValue(repository.save(categoria), CategoriaDTO.class);
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }

    @Override
    public CategoriaDTO buscar(Long aLong) {
        try {
            Optional<Categoria> categoria = repository.findById(aLong);
            if (categoria.isPresent()) {
                return mapper.convertValue(categoria.get(), CategoriaDTO.class);
            }
            throw new NoDataFoundExceptions("No se encontro la categoria");
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }


    @Override
    public CategoriaDTO editar(CategoriaDTO categoriaDTO) {
        try {
            Categoria categoria = mapper.convertValue(categoriaDTO, Categoria.class);
            return mapper.convertValue(repository.save(categoria), CategoriaDTO.class);
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }

    @Override
    public List<CategoriaDTO> listarTodos() {
        try {
            List<CategoriaDTO> categorias = new ArrayList<>();
            List<Categoria> listaCategorias = repository.findAll();
            for (Categoria categoria : listaCategorias) {
                categorias.add(mapper.convertValue(categoria, CategoriaDTO.class));
            }
            return categorias;
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }


    @Override
    public void eliminar(Long id) {
        try {
            Optional<Categoria> categoria = repository.findById(id);
            if (categoria.isPresent())
                repository.deleteById(id);
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }
}

