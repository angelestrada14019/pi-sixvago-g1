package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.PoliticaDTO;
import com.example.proyectoIntegrador.dto.ProductoDTO;
import com.example.proyectoIntegrador.dto.TipoDePoliticaDTO;
import com.example.proyectoIntegrador.entity.Politica;
import com.example.proyectoIntegrador.entity.Producto;
import com.example.proyectoIntegrador.entity.TipoDePolitica;
import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import com.example.proyectoIntegrador.repository.IPoliticaRepository;
import com.example.proyectoIntegrador.repository.IProductoRepository;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class PoliticaService implements IGeneralService<PoliticaDTO, Long> {
    @Autowired
    private IPoliticaRepository repository;
    @Autowired
    private ObjectMapper mapper;



    @Override
    public PoliticaDTO agregar(PoliticaDTO politicaDTO) {
        try {
            Politica politica = mapper.convertValue(politicaDTO, Politica.class);
            return mapper.convertValue(repository.save(politica), PoliticaDTO.class);
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
    public PoliticaDTO buscar(Long aLong) {
        try {
            Optional<Politica> politica = repository.findById(aLong);
            if (politica.isPresent()) {
                return mapper.convertValue(politica.get(), PoliticaDTO.class);
            }
            throw new NoDataFoundExceptions("No se encontro el producto");
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }

    public List<PoliticaDTO> findByTipoDePoliticaId(Long id) {
        try {
            List<Politica> politica = repository.findByTipoDePoliticaId(id);
            if (politica.isEmpty()) {
                throw new NoDataFoundExceptions("No se encontro el producto");
            }
            return mapper.convertValue(politica, List.class);
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
    public PoliticaDTO editar(PoliticaDTO politicaDTO) {
        try {
            Politica politica = mapper.convertValue(politicaDTO, Politica.class);
            return mapper.convertValue(repository.save(politica), PoliticaDTO.class);
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
    public List<PoliticaDTO> listarTodos() {
        try {
            List<PoliticaDTO> politica = new ArrayList<>();
            List<Politica> politicas = repository.findAll();
            for (Politica p : politicas) {
                politica.add(mapper.convertValue(p, PoliticaDTO.class));
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
        try {
            Optional<Politica> politica = repository.findById(aLong);
            if (politica.isPresent())
                repository.deleteById(aLong);
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
