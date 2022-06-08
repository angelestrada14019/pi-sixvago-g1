package com.example.proyectoIntegrador.dto;

import com.example.proyectoIntegrador.entity.Producto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.IdClass;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class CiudadDTO {
        private Long ciudades_id;
        private String nombre;
        private String pais;
        private List<Producto> productos;
}
