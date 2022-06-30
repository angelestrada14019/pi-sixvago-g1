package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.PuntuacionDTO;
import com.example.proyectoIntegrador.entity.Puntuacion;
import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import com.example.proyectoIntegrador.repository.IPuntuacionRepository;
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
public class PuntuacionService implements IGeneralService<PuntuacionDTO,Long> {

    @Autowired
    IPuntuacionRepository iPuntuacionRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public PuntuacionDTO agregar(PuntuacionDTO puntuacionDTO) {
        try {
            Puntuacion puntuacion = mapper.convertValue(puntuacionDTO, Puntuacion.class);
            return mapper.convertValue(iPuntuacionRepository.save(puntuacion), PuntuacionDTO.class);
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
    public PuntuacionDTO buscar(Long aLong) {
        try {
            return mapper.convertValue(iPuntuacionRepository
                    .findById(aLong).orElseThrow(
                            () -> new NoDataFoundExceptions("No existe la reserva")), PuntuacionDTO.class);
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }

    public List<PuntuacionDTO> findByUsuarioId(Long aLong) {
        try {
            List<PuntuacionDTO> puntuacionDTO = new ArrayList<>();
            List<Puntuacion> puntuaciones = iPuntuacionRepository.findByUsuariosId(aLong);
            for (Puntuacion puntuacion : puntuaciones) {
                puntuacionDTO.add(mapper.convertValue(puntuacion, PuntuacionDTO.class));
            }
            return puntuacionDTO;
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }public List<PuntuacionDTO> findByProductoId(Long aLong) {
        try {
            List<PuntuacionDTO> puntuacionDTO = new ArrayList<>();
            List<Puntuacion> puntuaciones = iPuntuacionRepository.findByProductoId(aLong);
            for (Puntuacion puntuacion : puntuaciones) {
                puntuacionDTO.add(mapper.convertValue(puntuacion, PuntuacionDTO.class));
            }
            return puntuacionDTO;
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
    public PuntuacionDTO editar(PuntuacionDTO puntuacionDTO) {
        try {
            Puntuacion puntuacion = mapper.convertValue(puntuacionDTO, Puntuacion.class);
            Optional<Puntuacion> entityS = iPuntuacionRepository.findById(puntuacion.getId());
            entityS.orElseThrow(() -> new NoDataFoundExceptions("error al actualizar el id: " + puntuacion.getId()));
            return mapper.convertValue(iPuntuacionRepository.save(puntuacion), PuntuacionDTO.class);
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
    public List<PuntuacionDTO> listarTodos() {
        try {
            List<PuntuacionDTO> puntuacionDTOS = new ArrayList<>();
            List<Puntuacion> puntuacions = iPuntuacionRepository.findAll();
            for (Puntuacion p : puntuacions) {
                puntuacionDTOS.add(mapper.convertValue(p, PuntuacionDTO.class));
            }
            return puntuacionDTOS;
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
            Puntuacion entityS = iPuntuacionRepository.findById(aLong)
                    .orElseThrow(() -> new NoDataFoundExceptions("no existe el id: " + aLong));
            iPuntuacionRepository.delete(entityS);
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
