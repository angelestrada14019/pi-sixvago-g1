package com.example.proyectoIntegrador.dto;

import com.example.proyectoIntegrador.entity.Caracteristicas;
import com.example.proyectoIntegrador.entity.Categoria;
import com.example.proyectoIntegrador.entity.Ciudad;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductoDTO {
    private Long productos_id;
    private String nombre;
    private String descripcion;
    private String direccion;
    private String politicas_servicio;

    private Categoria categorias_id;
    private Ciudad ciudades_id;

    private List<Caracteristicas> caracteristicas;
    private List<ImagenDTO> listadeimagenes;
}
