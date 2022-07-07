package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.CiudadDTO;
import com.example.proyectoIntegrador.entity.Ciudad;
import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import com.example.proyectoIntegrador.repository.ICiudadRepository;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class CiudadService implements IGeneralService<CiudadDTO, Long> {

    @Autowired
    private ICiudadRepository ciudadRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public CiudadDTO agregar(CiudadDTO ciudadDTO) {
        try {
            if (ciudadDTO == null || ciudadDTO.getNombre() == null) {
                throw new NoDataFoundExceptions("Los datos ingresados no existen");
            } else {
                Ciudad ciudadNueva = mapper.convertValue(ciudadDTO, Ciudad.class);
                ciudadRepository.save(ciudadNueva);
                return mapper.convertValue(ciudadNueva, CiudadDTO.class);
            }
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
    public CiudadDTO buscar(Long aLong) {
        try {
            return mapper.convertValue(ciudadRepository.findById(aLong).orElseThrow(() -> new NoDataFoundExceptions("No existe la ciudad")), CiudadDTO.class);
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
    public CiudadDTO editar(CiudadDTO ciudadDTO) {
        try {
            if (ciudadDTO == null || ciudadDTO.getNombre() == null) {
                throw new NoDataFoundExceptions("Los datos no existen");
            }
            if (ciudadDTO.getCiudades_id() == null) {
                throw new NoDataFoundExceptions("No se puede editar una ciudad sin id");
            } else {
                Ciudad ciudadEditada = mapper.convertValue(ciudadDTO, Ciudad.class);
                ciudadRepository.save(ciudadEditada);
                return mapper.convertValue(ciudadEditada, CiudadDTO.class);
            }
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
    public List<CiudadDTO> listarTodos() {
        try {
            List<Ciudad> ciudades = ciudadRepository.findAll();
            List<CiudadDTO> ciudadesDTO = new ArrayList<>();
            for (Ciudad ciudad : ciudades) {
                ciudadesDTO.add(mapper.convertValue(ciudad, CiudadDTO.class));
            }
            return ciudadesDTO;
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
            Ciudad entityS = ciudadRepository.findById(aLong)
                    .orElseThrow(() -> new NoDataFoundExceptions("no existe el id: " + aLong));
            ciudadRepository.delete(entityS);
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
