package com.example.proyectoIntegrador.dto;

import com.example.proyectoIntegrador.entity.Caracteristicas;
import com.example.proyectoIntegrador.entity.Categoria;
import com.example.proyectoIntegrador.entity.TipoDePolitica;
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
public class PoliticaDTO {
    private Long id;
    private String descripcion;
    private TipoDePolitica  tipoDePolitica;


}
