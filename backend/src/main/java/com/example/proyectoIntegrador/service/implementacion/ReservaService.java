package com.example.proyectoIntegrador.service.implementacion;


import com.example.proyectoIntegrador.dto.ReservaDTO;
import com.example.proyectoIntegrador.entity.Reserva;
import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import com.example.proyectoIntegrador.repository.IReservaRepository;
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
public class ReservaService implements IGeneralService<ReservaDTO, Long> {

    @Autowired
    private IReservaRepository iReservaRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public ReservaDTO agregar(ReservaDTO reservaDTO) {
        try {
            Reserva reserva = mapper.convertValue(reservaDTO, Reserva.class);
            return mapper.convertValue(iReservaRepository.save(reserva), ReservaDTO.class);
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
    public ReservaDTO buscar(Long aLong) {
        try {
            return mapper.convertValue(iReservaRepository
                    .findById(aLong).orElseThrow(
                            () -> new NoDataFoundExceptions("No existe la reserva")), ReservaDTO.class);
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
    public ReservaDTO editar(ReservaDTO reservaDTO) {
        try {
            Reserva reserva = mapper.convertValue(reservaDTO, Reserva.class);
            Optional<Reserva> entityS = iReservaRepository.findById(reserva.getId());
            entityS.orElseThrow(() -> new NoDataFoundExceptions("error al actualizar el id: " + reserva.getId()));
            return mapper.convertValue(iReservaRepository.save(reserva), ReservaDTO.class);
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
    public List<ReservaDTO> listarTodos() {
        try {
            List<ReservaDTO> reservaDTOS = new ArrayList<>();
            List<Reserva> reservas = iReservaRepository.findAll();
            for (Reserva r : reservas) {
                reservaDTOS.add(mapper.convertValue(r, ReservaDTO.class));
            }
            return reservaDTOS;
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
            Reserva entityS = iReservaRepository.findById(aLong)
                    .orElseThrow(() -> new NoDataFoundExceptions("no existe el id: " + aLong));
            iReservaRepository.delete(entityS);
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }
    public List<ReservaDTO> buscarReservaPorProductoId(Long id){
        try {
            List<ReservaDTO> reservaDTOS = new ArrayList<>();
            List<Reserva> reservas = iReservaRepository.buscarReservaPorProductoId(id);
            for (Reserva reserva : reservas) {
                reservaDTOS.add(mapper.convertValue(reserva, ReservaDTO.class));
            }
            return reservaDTOS;
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
