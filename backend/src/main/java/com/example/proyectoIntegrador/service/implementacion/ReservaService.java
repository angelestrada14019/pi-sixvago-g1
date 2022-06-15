package com.example.proyectoIntegrador.service.implementacion;


import com.example.proyectoIntegrador.dto.ReservaDTO;
import com.example.proyectoIntegrador.entity.Reserva;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
import com.example.proyectoIntegrador.repository.IReservaRepository;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService implements IGeneralService<ReservaDTO, Long> {

    @Autowired
    private IReservaRepository iReservaRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public ReservaDTO agregar(ReservaDTO reservaDTO) throws BadRequestException {
        Reserva reserva = mapper.convertValue(reservaDTO,Reserva.class);
        return mapper.convertValue(iReservaRepository.save(reserva),ReservaDTO.class);
    }

    @Override
    public ReservaDTO buscar(Long aLong) throws BadRequestException {
        return mapper.convertValue(iReservaRepository
                .findById(aLong).orElseThrow(
                        () -> new BadRequestException("No existe la reserva")), ReservaDTO.class);
    }

    @Override
    public ReservaDTO editar(ReservaDTO reservaDTO) throws BadRequestException {
            Reserva reserva = mapper.convertValue(reservaDTO, Reserva.class);
        Optional<Reserva> entityS=iReservaRepository.findById(reserva.getId());
        entityS.orElseThrow(()-> new BadRequestException("error al actualizar el id: " + reserva.getId()));
        return mapper.convertValue(iReservaRepository.save(reserva), ReservaDTO.class);

    }

    @Override
    public List<ReservaDTO> listarTodos() {
        List<ReservaDTO> reservaDTOS = new ArrayList<>();
        List <Reserva> reservas = iReservaRepository.findAll();
        for(Reserva r: reservas){
            reservaDTOS.add(mapper.convertValue(r, ReservaDTO.class));
        }
        return reservaDTOS;
    }

    @Override
    public void eliminar(Long aLong) throws BadRequestException {
        Reserva entityS = iReservaRepository.findById(aLong)
                .orElseThrow(() -> new BadRequestException("no existe el id: " + aLong));
        iReservaRepository.delete(entityS);
    }
    public List<ReservaDTO> buscarReservaPorProductoId(Long id){

        List<ReservaDTO> reservaDTOS = new ArrayList<>();
        List<Reserva> reservas =iReservaRepository.buscarReservaPorProductoId(id);
        for (Reserva reserva:reservas){
            reservaDTOS.add(mapper.convertValue(reserva,ReservaDTO.class));
        }
        return reservaDTOS;

    }
}
