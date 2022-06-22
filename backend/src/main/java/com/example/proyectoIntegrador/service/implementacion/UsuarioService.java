package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.UsuarioDTO;
import com.example.proyectoIntegrador.entity.Usuario;
import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import com.example.proyectoIntegrador.repository.IUsuarioRepository;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UsuarioService implements IGeneralService<UsuarioDTO,Long> {

    @Autowired
    private IUsuarioRepository iUsuarioRepository;
    @Autowired
    private ObjectMapper mapper;

    @Transactional
    public Usuario findUsuarioByEmail(String email){
        try {
            Optional<Usuario> usuario = Optional.ofNullable(iUsuarioRepository.findUsuarioByEmail(email));
            Usuario usuario1 = usuario.orElseThrow(() -> new NoDataFoundExceptions("no existe el email: " + email));
            return usuario1;

        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }
    public Boolean existsUsuarioByEmail(String email){
        return iUsuarioRepository.existsUsuarioByEmail(email);
    }

    public UsuarioDTO agregar(UsuarioDTO usuarioDTO) {
        try {
            Usuario usuario = mapper.convertValue(usuarioDTO, Usuario.class);
            return mapper.convertValue(iUsuarioRepository.save(usuario), UsuarioDTO.class);
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
    public UsuarioDTO buscar(Long aLong) {
        return null;
    }

    @Override
    public UsuarioDTO editar(UsuarioDTO usuarioDTO)  {
        return null;
    }

    @Override
    public List<UsuarioDTO> listarTodos() {
        try {


            List<UsuarioDTO> usuarioDTOS = new ArrayList<>();
            List<Usuario> usuarios = iUsuarioRepository.findAll();
            for (Usuario u : usuarios) {
                usuarioDTOS.add(mapper.convertValue(u, UsuarioDTO.class));
            }
            return usuarioDTOS;
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

    }
}
