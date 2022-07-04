package com.example.proyectoIntegrador.service.implementacion;


import com.example.proyectoIntegrador.dto.ReservaDTO;
import com.example.proyectoIntegrador.entity.Producto;
import com.example.proyectoIntegrador.entity.Reserva;
import com.example.proyectoIntegrador.entity.Usuario;
import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import com.example.proyectoIntegrador.repository.IProductoRepository;
import com.example.proyectoIntegrador.repository.IReservaRepository;
import com.example.proyectoIntegrador.repository.IUsuarioRepository;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ReservaService implements IGeneralService<ReservaDTO, Long> {

    @Autowired
    private IReservaRepository iReservaRepository;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private IUsuarioRepository usuarioRepository;

    @Autowired
    private IProductoRepository iProductoRepository;

    @Value("${app.HOST_WEB}")
    private String hostWeb;

    @Value("${spring.mail.username}")
    private String email;

    @Override
    public ReservaDTO agregar(ReservaDTO reservaDTO) {
        try {
            Reserva reserva = mapper.convertValue(reservaDTO, Reserva.class);
            Producto producto = iProductoRepository.findById(reserva.getProductosProductos().getProductos_id()).orElseThrow(()->
                    new NoDataFoundExceptions("No existe el id del producto"));
            Usuario usuario =usuarioRepository.findById(reserva.getUsuarios().getId()).orElseThrow(()->
                    new NoDataFoundExceptions("No existe el id"));
            List<Reserva> reserva1 = iReservaRepository.buscarReservaPorProductoId(reservaDTO.getProductosProductos().getProductos_id());
            Integer auxCount =0;
            for (Reserva reserva2 : reserva1) {
                if(usuario.getEnable()==null || !usuario.getEnable()){
                    throw new ValidateServiceExceptions("verifique la cuenta");
                }
                if (LocalDate.now().isAfter(reserva.getFechaInicialReserva())
                        || LocalDate.now().isAfter(reserva.getFechaFinalReserva())
                || reserva.getFechaInicialReserva().isAfter(reserva.getFechaFinalReserva())
                ){
                throw new ValidateServiceExceptions("escoja fechas validas");
                }
                if (
                isBetweenInclusive(reserva.getFechaInicialReserva(), reserva.getFechaFinalReserva(), reserva2.getFechaInicialReserva())
                        || isBetweenInclusive(reserva.getFechaInicialReserva(), reserva.getFechaFinalReserva(), reserva2.getFechaFinalReserva())
                ){
                    auxCount++;
                }
            }
            if (producto.getHabitaciones()<=auxCount){
                throw new ValidateServiceExceptions("No hay habitaciones para este producto");
            }
            sendVerificationEmail(reserva);
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
    boolean isBetweenInclusive(LocalDate start, LocalDate end, LocalDate target) {
        return !(target.isBefore(start) || target.isAfter(end));
    }
    private void sendVerificationEmail(Reserva reserva) throws MessagingException, UnsupportedEncodingException {
        Usuario usuario =usuarioRepository.findById(reserva.getUsuarios().getId()).orElseThrow(()->
                new NoDataFoundExceptions("No existe el id"));
        String subject = "Reserva Exitosa";
        String senderName = "SixVago Team";
        String mailContent = "<p>Para "+ usuario.getApellido()+", "+usuario.getNombre()+",</p>";
        mailContent += "<p> Se ha creado la reserva correctamente </p>";
        mailContent += "<p>"+"hora Llegada:"+ reserva.getHoraComienzoReserva()+"</p>";
        mailContent += "<p>"+"fecha Inicial:"+ reserva.getFechaInicialReserva()+"</p>";
        mailContent += "<p>"+"Fecha Final:"+ reserva.getFechaFinalReserva()+"</p>";
        mailContent += "<p>"+"Vacuna contra el COVID: "+ (reserva.getVacunaCovid()?"vacunado":"no vacunado")+"</p>";
        mailContent += "<p>"+"Datos para el vendedor: "+ reserva.getDatosParaVendedor()+"</p>";
        mailContent += "<p>"+"ID Producto Reservado:"+ reserva.getProductosProductos().getProductos_id()+"</p>";
        mailContent += "<p> Para visitar el producto seleccionado click aqui: </p>";
        String verifyURL="http://"+ hostWeb + "/producto/"+reserva.getProductosProductos().getProductos_id();
        mailContent += "<h3><a href=\""+verifyURL+"\">Visitar producto</a><h3>";
        mailContent += "<p> Gracias de parte de SixVago team</p>";
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(email,senderName);
        helper.setTo(usuario.getEmail());
        helper.setSubject(subject);
        helper.setText(mailContent,true);
        mailSender.send(message);
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

    public List<ReservaDTO> reservasPorIdUsuario(Long id){
        try{
            List<ReservaDTO> reservaDTOS = new ArrayList<>();
            List<Reserva> reservas = iReservaRepository.reservasPorIdUsuario(id);
            for (Reserva reserva : reservas){
                reservaDTOS.add(mapper.convertValue(reserva, ReservaDTO.class));
            }
            return reservaDTOS;
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(), e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }
}
