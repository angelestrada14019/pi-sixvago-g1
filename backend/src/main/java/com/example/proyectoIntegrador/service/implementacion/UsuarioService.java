package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.ReservaDTO;
import com.example.proyectoIntegrador.dto.UsuarioDTO;
import com.example.proyectoIntegrador.entity.Reserva;
import com.example.proyectoIntegrador.entity.Usuario;
import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import com.example.proyectoIntegrador.repository.IUsuarioRepository;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UsuarioService{

    @Autowired
    private IUsuarioRepository iUsuarioRepository;
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.HOST_WEB}")
    private String hostWeb;

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

    @Transactional
    public UsuarioDTO agregar(UsuarioDTO usuarioDTO) {
        try {
            usuarioDTO.setEnable(false);
            Usuario usuario = mapper.convertValue(usuarioDTO, Usuario.class);
            String randomCode = RandomString.make(64);
            usuario.setVerification_code(randomCode);
            UsuarioDTO usuarioDTO1 = mapper.convertValue(iUsuarioRepository.save(usuario), UsuarioDTO.class);
            sendVerificationEmail(usuarioDTO1);
            return usuarioDTO1;
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }

    private void sendVerificationEmail(UsuarioDTO usuarioDTO1) throws MessagingException, UnsupportedEncodingException {
        String subject = "Por favor, verifique su email";
        String senderName = "SixVago Team";
        String mailContent = "<p>Para "+ usuarioDTO1.getApellido()+", "+usuarioDTO1.getNombre()+",</p>";
        mailContent += "<p> Click en el siguiente link para verificar el registro: </p>";
        String verifyURL="http://"+ hostWeb + "/verify?code="+ usuarioDTO1.getVerification_code();
        mailContent += "<h3><a href=\""+verifyURL+"\">Verificar</a><h3>";
        mailContent += "<p> Gracias de parte de SixVago team</p>";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("angelestrada14019@gmail.com",senderName);
        helper.setTo(usuarioDTO1.getEmail());
        helper.setSubject(subject);
        helper.setText(mailContent,true);
        mailSender.send(message);
    }
    public Boolean verify(String code){
        try {
            Optional<Usuario> usuario = Optional.ofNullable(iUsuarioRepository.buscarUsuarioPorCodigo(code));
            Usuario usuario1 = usuario.orElseThrow(() -> new NoDataFoundExceptions("no existe el codigo: " + code));
            changeEnable(mapper.convertValue(usuario1,UsuarioDTO.class));
             return true;

        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }
    public void changeEnable(UsuarioDTO usuarioDTO){
        try {
            Usuario entityS = iUsuarioRepository.findById(usuarioDTO.getId()).orElseThrow(() ->
                    new NoDataFoundExceptions("no existe el id: " + usuarioDTO.getId()));
            entityS.setEnable(true);
            iUsuarioRepository.save(entityS);
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }


    public UsuarioDTO buscar(Long aLong) {
        return null;
    }


    public UsuarioDTO editar(UsuarioDTO usuarioDTO)  {
        try {
            Usuario entityS = iUsuarioRepository.findById(usuarioDTO.getId()).orElseThrow(() ->
                    new NoDataFoundExceptions("no existe el id: " + usuarioDTO.getId()));
            entityS.setCiudad(usuarioDTO.getCiudad());
            return mapper.convertValue(iUsuarioRepository.save(entityS), UsuarioDTO.class);
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }


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


    public void eliminar(Long aLong) {

    }
}
