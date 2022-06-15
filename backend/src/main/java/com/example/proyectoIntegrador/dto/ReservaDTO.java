package com.example.proyectoIntegrador.dto;

import com.example.proyectoIntegrador.entity.Producto;
import com.example.proyectoIntegrador.entity.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservaDTO {

    private Long id;
    private LocalTime horaComienzoReserva;
    private LocalDate fechaInicialReserva;
    private LocalDate fechaFinalReserva;
    private Boolean vacunaCovid;
    private String datosParaVendedor;
    @JsonIgnoreProperties(value = {"nombre","descripcion", "direccion", "politicas_servicio","categorias_id","ciudades_id","caracteristicas","listadeimagenes"})
    private Producto productosProductos;
    @JsonIgnoreProperties(value = {"nombre","apellido", "email", "contrasenia","ciudad"})
    private Usuario usuarios;
}
