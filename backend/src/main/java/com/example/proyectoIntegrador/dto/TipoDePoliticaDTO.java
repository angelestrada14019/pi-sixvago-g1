package com.example.proyectoIntegrador.dto;

import com.example.proyectoIntegrador.entity.Politica;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class TipoDePoliticaDTO {

    private Long id;
    private String  nombre;


}
