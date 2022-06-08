package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.CiudadDTO;
import com.example.proyectoIntegrador.dto.ProductoDTO;
import com.example.proyectoIntegrador.entity.Ciudad;
import com.example.proyectoIntegrador.entity.Producto;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
import com.example.proyectoIntegrador.repository.ICiudadRepository;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CiudadService implements IGeneralService<CiudadDTO, Long> {

    @Autowired
    private ICiudadRepository ciudadRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public CiudadDTO agregar(CiudadDTO ciudadDTO) throws BadRequestException {
        if (ciudadDTO == null || ciudadDTO.getNombre() == null) {
            throw new BadRequestException("Los datos ingresados no existen");
        }else {
            Ciudad ciudadNueva = mapper.convertValue(ciudadDTO, Ciudad.class);
            ciudadRepository.save(ciudadNueva);
            return mapper.convertValue(ciudadNueva, CiudadDTO.class);
        }

    }

    @Override
    public CiudadDTO buscar(Long aLong) throws BadRequestException {
        return mapper.convertValue(ciudadRepository.findById(aLong).orElseThrow( () -> new BadRequestException("No existe la ciudad")), CiudadDTO.class);
    }

    @Override
    public CiudadDTO editar(CiudadDTO ciudadDTO) throws BadRequestException {
        if (ciudadDTO == null || ciudadDTO.getNombre() == null) {
            throw new BadRequestException("Los datos no existen");
        }
        if (ciudadDTO.getCiudades_id() == null) {
            throw new BadRequestException("No se puede editar una ciudad sin id");
        } else {
            Ciudad ciudadEditada = mapper.convertValue(ciudadDTO, Ciudad.class);
            ciudadRepository.save(ciudadEditada);
            return mapper.convertValue(ciudadEditada, CiudadDTO.class);
        }
    }

    @Override
    public List<CiudadDTO> listarTodos() {
List<Ciudad> ciudades = ciudadRepository.findAll();
        List<CiudadDTO> ciudadesDTO = new ArrayList<>();
        for (Ciudad ciudad : ciudades) {
            ciudadesDTO.add(mapper.convertValue(ciudad, CiudadDTO.class));
        }
        return ciudadesDTO;
    }


    @Override
    public void eliminar(Long aLong) throws BadRequestException {
            Ciudad entityS = ciudadRepository.findById(aLong)
                    .orElseThrow(() -> new BadRequestException("no existe el id: " + aLong));
            ciudadRepository.delete(entityS);
    }
}
