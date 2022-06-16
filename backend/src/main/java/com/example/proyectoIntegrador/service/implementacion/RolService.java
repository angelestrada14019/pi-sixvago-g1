package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.ReservaDTO;
import com.example.proyectoIntegrador.dto.RolDTO;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
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
    public RolDTO agregar(RolDTO rolDTO) throws BadRequestException {
        return null;
    }

    @Override
    public RolDTO buscar(Long aLong) throws BadRequestException {
        return mapper.convertValue(iRolRepository
                .findById(aLong).orElseThrow(
                        () -> new BadRequestException("No existe la reserva")), RolDTO.class);
    }

    @Override
    public RolDTO editar(RolDTO rolDTO) throws BadRequestException {
        return null;
    }

    @Override
    public List<RolDTO> listarTodos() {
        return null;
    }

    @Override
    public void eliminar(Long aLong) throws BadRequestException {

    }
}
