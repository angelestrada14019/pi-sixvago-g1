package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.PuntuacionDTO;
import com.example.proyectoIntegrador.dto.ReservaDTO;
import com.example.proyectoIntegrador.entity.Puntuacion;
import com.example.proyectoIntegrador.entity.Reserva;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
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
    public PuntuacionDTO agregar(PuntuacionDTO puntuacionDTO) throws BadRequestException {
        Puntuacion puntuacion = mapper.convertValue(puntuacionDTO,Puntuacion.class);
        return mapper.convertValue(iPuntuacionRepository.save(puntuacion), PuntuacionDTO.class);
    }

    @Override
    public PuntuacionDTO buscar(Long aLong) throws BadRequestException {
        return mapper.convertValue(iPuntuacionRepository
                .findById(aLong).orElseThrow(
                        () -> new BadRequestException("No existe la reserva")), PuntuacionDTO.class);
    }

    @Override
    public PuntuacionDTO editar(PuntuacionDTO puntuacionDTO) throws BadRequestException {
        Puntuacion puntuacion = mapper.convertValue(puntuacionDTO, Puntuacion.class);
        Optional<Puntuacion> entityS=iPuntuacionRepository.findById(puntuacion.getId());
        entityS.orElseThrow(()-> new BadRequestException("error al actualizar el id: " + puntuacion.getId()));
        return mapper.convertValue(iPuntuacionRepository.save(puntuacion), PuntuacionDTO.class);
    }

    @Override
    public List<PuntuacionDTO> listarTodos() {
        List<PuntuacionDTO> puntuacionDTOS = new ArrayList<>();
        List <Puntuacion> puntuacions = iPuntuacionRepository.findAll();
        for(Puntuacion p: puntuacions){
            puntuacionDTOS.add(mapper.convertValue(p, PuntuacionDTO.class));
        }
        return puntuacionDTOS;
    }

    @Override
    public void eliminar(Long aLong) throws BadRequestException {
        Puntuacion entityS = iPuntuacionRepository.findById(aLong)
                .orElseThrow(() -> new BadRequestException("no existe el id: " + aLong));
        iPuntuacionRepository.delete(entityS);
    }
}
