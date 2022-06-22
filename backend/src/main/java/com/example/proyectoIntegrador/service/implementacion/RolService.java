package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.RolDTO;
import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import com.example.proyectoIntegrador.repository.IRolRepository;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class RolService implements IGeneralService<RolDTO,Long> {

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private IRolRepository iRolRepository;
    @Override
    public RolDTO agregar(RolDTO rolDTO) {
        return null;
    }

    @Override
    public RolDTO buscar(Long aLong)  {
        try {
            return mapper.convertValue(iRolRepository
                    .findById(aLong).orElseThrow(
                            () -> new NoDataFoundExceptions("No existe la reserva")), RolDTO.class);
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
    public RolDTO editar(RolDTO rolDTO) {
        return null;
    }

    @Override
    public List<RolDTO> listarTodos() {
        return null;
    }

    @Override
    public void eliminar(Long aLong)  {

    }
}
