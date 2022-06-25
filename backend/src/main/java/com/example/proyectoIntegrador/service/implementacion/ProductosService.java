package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.ProductoDTO;
import com.example.proyectoIntegrador.entity.Producto;
import com.example.proyectoIntegrador.entity.Reserva;
import com.example.proyectoIntegrador.exceptions.GeneralServicesExceptions;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import com.example.proyectoIntegrador.repository.IProductoRepository;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@Slf4j
public class ProductosService implements IGeneralService<ProductoDTO, Long> {

    @Autowired
    private IProductoRepository repository;
    @Autowired
    private ObjectMapper mapper;


    @Override
    public ProductoDTO agregar(ProductoDTO productoDTO) {
        try {
            Producto producto = mapper.convertValue(productoDTO, Producto.class);
            return mapper.convertValue(repository.save(producto), ProductoDTO.class);
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
    public ProductoDTO buscar(Long aLong) {
        try {
            Optional<Producto> producto = repository.findById(aLong);
            if (producto.isPresent()) {
                return mapper.convertValue(producto.get(), ProductoDTO.class);
            }
            throw new NoDataFoundExceptions("No se encontro el producto");
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
    public ProductoDTO editar(ProductoDTO productoDTO) {
        try {
            Producto producto = mapper.convertValue(productoDTO, Producto.class);
            return mapper.convertValue(repository.save(producto), ProductoDTO.class);
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
    public List<ProductoDTO> listarTodos() {
        try {
            List<ProductoDTO> producto = new ArrayList<>();
            List<Producto> productos = repository.findAll();
            for (Producto p : productos) {
                producto.add(mapper.convertValue(p, ProductoDTO.class));
            }
            return producto;
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
            Optional<Producto> producto = repository.findById(aLong);
            if (producto.isPresent())
                repository.deleteById(aLong);
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }
    public List<ProductoDTO> findByNombreCiudad(String nombreCiudad){
        try {
            List<ProductoDTO> productoDTO = new ArrayList<>();
            List<Producto> productos = repository.buscarCiudad(nombreCiudad);
            for (Producto producto : productos) {
                productoDTO.add(mapper.convertValue(producto, ProductoDTO.class));
            }
            return productoDTO;
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }
    public List<ProductoDTO> findByTituloCategoria(String tituloCategoria){
        try {
            List<ProductoDTO> productoDTO = new ArrayList<>();
            List<Producto> productos = repository.buscarCategoria(tituloCategoria);
            for (Producto producto : productos) {
                productoDTO.add(mapper.convertValue(producto, ProductoDTO.class));
            }
            return productoDTO;
        }catch (ValidateServiceExceptions | NoDataFoundExceptions e){
            log.info(e.getMessage(),e);
            throw e;
        }
        catch (Exception e){
            log.error(e.getMessage(),e);
            throw new GeneralServicesExceptions(e.getMessage(),e);
        }
    }
    public List<ProductoDTO> buscarProductosFechaIF(LocalDate fechaInicial, LocalDate fechaFinal){
        try {
            List<ProductoDTO> productoDTOS = new ArrayList<>();
            List<Producto> productos = repository.findAll();
            for (Producto producto : productos) {
                if (producto.getReservas().isEmpty()) {
                    productoDTOS.add(mapper.convertValue(producto, ProductoDTO.class));
                } else {
                        List<Boolean> aux =new ArrayList<>();
                    for (Reserva reserva : producto.getReservas()) {
                        aux.add(!(
                                isBetweenInclusive(reserva.getFechaInicialReserva(), reserva.getFechaFinalReserva(), fechaInicial)
                                        || isBetweenInclusive(reserva.getFechaInicialReserva(), reserva.getFechaFinalReserva(), fechaFinal)
                        ));


                    }
                    if(!aux.contains(false)){
                        productoDTOS.add(mapper.convertValue(producto, ProductoDTO.class));
                    }
                }
            }
            return productoDTOS;
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
    return !target.isBefore(start) && !target.isAfter(end);
}
}
