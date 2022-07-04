package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.ImagenDTO;
import com.example.proyectoIntegrador.dto.PoliticaDTO;
import com.example.proyectoIntegrador.entity.Imagen;
import com.example.proyectoIntegrador.entity.Politica;
import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import com.example.proyectoIntegrador.repository.ImagenRepository;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ImagenService implements IGeneralService<ImagenDTO, Long> {


    @Autowired
    private ImagenRepository imagenRepository;
    @Autowired
    private ObjectMapper mapper;

    @Override
    public ImagenDTO agregar(ImagenDTO imagenDTO)  {
        try {
            Imagen imagen = mapper.convertValue(imagenDTO, Imagen.class);
            return mapper.convertValue(imagenRepository.save(imagen), ImagenDTO.class);
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
    public ImagenDTO buscar(Long aLong) {
        return null;
    }

    @Override
    public ImagenDTO editar(ImagenDTO imagen) {
        return null;
    }

    @Override
    public List<ImagenDTO> listarTodos() {
        return null;
    }

    @Override
    public void eliminar(Long aLong)  {

    }
}