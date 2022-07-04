package com.example.proyectoIntegrador.dto;

import com.example.proyectoIntegrador.entity.Producto;
import com.example.proyectoIntegrador.entity.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class PuntuacionDTO {


    private Long id;
    private Integer puntuacion;
    @JsonIgnoreProperties(value = {"nombre","apellido", "email", "contrasenia","ciudad"})
    private Usuario usuarios;
    @JsonIgnoreProperties(value = {"nombre","descripcion", "direccion", "politicas_servicio","categorias_id","ciudades_id","caracteristicas","listadeimagenes","reservas"})
    private Producto productosProductos;
}
