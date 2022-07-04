package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.PoliticaDTO;
import com.example.proyectoIntegrador.dto.TipoDePoliticaDTO;
import com.example.proyectoIntegrador.entity.Politica;
import com.example.proyectoIntegrador.entity.TipoDePolitica;
import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import com.example.proyectoIntegrador.repository.IPoliticaRepository;
import com.example.proyectoIntegrador.repository.ITipoDePoliticaRepository;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j

public class TipoDePoliticaService implements IGeneralService<TipoDePoliticaDTO, Long> {
    @Autowired
    private ITipoDePoliticaRepository repository;
    @Autowired
    private ObjectMapper mapper;

    @Override
    public TipoDePoliticaDTO agregar(TipoDePoliticaDTO tipoDePoliticaDTO) {
        return null;
    }

    @Override
    public TipoDePoliticaDTO buscar(Long aLong) {
        return null;
    }

    @Override
    public TipoDePoliticaDTO editar(TipoDePoliticaDTO tipoDePoliticaDTO) {
        return null;
    }

    @Override
    public List<TipoDePoliticaDTO> listarTodos() {
        try {
            List<TipoDePoliticaDTO> politica = new ArrayList<>();
            List<TipoDePolitica> politicas = repository.findAll();
            for (TipoDePolitica p : politicas) {
                politica.add(mapper.convertValue(p, TipoDePoliticaDTO.class));
            }
            return politica;
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
    public void eliminar(Long aLong) {

    }
}
