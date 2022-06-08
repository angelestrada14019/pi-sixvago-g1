package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.CaracteristicasDTO;
import com.example.proyectoIntegrador.dto.CategoriaDTO;
import com.example.proyectoIntegrador.entity.Caracteristicas;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
import com.example.proyectoIntegrador.repository.ICaracteristicasRepository;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class CaracteristicasService implements IGeneralService<CaracteristicasDTO, Long> {

    @Autowired
    private ICaracteristicasRepository caracteristicasRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public CaracteristicasDTO agregar(CaracteristicasDTO caracteristicasDTO) throws BadRequestException {
        Caracteristicas caracteristica = new Caracteristicas();
        caracteristica.setNombre(caracteristicasDTO.getNombre());
        caracteristica.setIcono(caracteristicasDTO.getIcono());
        return mapper.convertValue(caracteristicasRepository.save(caracteristica),CaracteristicasDTO.class);
    }

    @Override
    public CaracteristicasDTO buscar(Long aLong) throws BadRequestException {
        Caracteristicas caracteristica = caracteristicasRepository.findById(aLong).orElse(null);
        if (caracteristica == null){
            throw new BadRequestException("No se encontro la caracteristica");
        }
        return mapper.convertValue(caracteristica,CaracteristicasDTO.class);
    }

    @Override
    public CaracteristicasDTO editar(CaracteristicasDTO caracteristicasDTO) throws BadRequestException {
Caracteristicas caracteristica = mapper.convertValue(this.buscar(caracteristicasDTO.getCaracteristicas_id()),Caracteristicas.class);
        if (caracteristica != null){
            caracteristica.setNombre(caracteristicasDTO.getNombre());
            caracteristica.setIcono(caracteristicasDTO.getIcono());
            return mapper.convertValue(caracteristicasRepository.save(caracteristica),CaracteristicasDTO.class);
        }else{
            throw new BadRequestException("No se encontro la caracteristica");
        }
    }

    @Override
    public List<CaracteristicasDTO> listarTodos() {
        return mapper.convertValue(caracteristicasRepository.findAll(),List.class);
    }


    @Override
    public void eliminar(Long aLong) throws BadRequestException {
        Caracteristicas caracteristica = caracteristicasRepository.findById(aLong).orElse(null);
        if (caracteristica != null){
            caracteristicasRepository.delete(caracteristica);
        }else{
            throw new BadRequestException("No se encontro la caracteristica");
        }
    }
}

