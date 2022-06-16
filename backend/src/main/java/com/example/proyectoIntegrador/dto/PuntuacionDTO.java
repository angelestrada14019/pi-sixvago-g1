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
    private Usuario usuarios;
    private Producto productosProductos;
}
