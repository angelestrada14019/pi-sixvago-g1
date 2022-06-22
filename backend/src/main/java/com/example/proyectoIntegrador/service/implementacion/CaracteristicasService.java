package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.CaracteristicasDTO;
import com.example.proyectoIntegrador.entity.Caracteristicas;
import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import com.example.proyectoIntegrador.repository.ICaracteristicasRepository;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CaracteristicasService implements IGeneralService<CaracteristicasDTO, Long> {

    @Autowired
    private ICaracteristicasRepository caracteristicasRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public CaracteristicasDTO agregar(CaracteristicasDTO caracteristicasDTO) {
        try {
            Caracteristicas caracteristica = new Caracteristicas();
            caracteristica.setNombre(caracteristicasDTO.getNombre());
            caracteristica.setIcono(caracteristicasDTO.getIcono());
            return mapper.convertValue(caracteristicasRepository.save(caracteristica), CaracteristicasDTO.class);
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
    public CaracteristicasDTO buscar(Long aLong) {
        try {
            Caracteristicas caracteristica = caracteristicasRepository.findById(aLong).orElse(null);
            if (caracteristica == null) {
                throw new NoDataFoundExceptions("No se encontro la caracteristica");
            }
            return mapper.convertValue(caracteristica, CaracteristicasDTO.class);
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
    public CaracteristicasDTO editar(CaracteristicasDTO caracteristicasDTO) {
        try {
            Caracteristicas caracteristica = mapper.convertValue(this.buscar(caracteristicasDTO.getCaracteristicas_id()), Caracteristicas.class);
            if (caracteristica != null) {
                caracteristica.setNombre(caracteristicasDTO.getNombre());
                caracteristica.setIcono(caracteristicasDTO.getIcono());
                return mapper.convertValue(caracteristicasRepository.save(caracteristica), CaracteristicasDTO.class);
            } else {
                throw new NoDataFoundExceptions("No se encontro la caracteristica");
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
    public List<CaracteristicasDTO> listarTodos() {
        try {
            return mapper.convertValue(caracteristicasRepository.findAll(), List.class);
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
            Caracteristicas caracteristica = caracteristicasRepository.findById(aLong).orElse(null);
            if (caracteristica != null) {
                caracteristicasRepository.delete(caracteristica);
            } else {
                throw new NoDataFoundExceptions("No se encontro la caracteristica");
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
}

