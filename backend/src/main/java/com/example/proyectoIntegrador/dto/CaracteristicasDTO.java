package com.example.proyectoIntegrador.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)

public class CaracteristicasDTO {

        private Long caracteristicas_id;
        private String nombre;
        private String icono;
}
