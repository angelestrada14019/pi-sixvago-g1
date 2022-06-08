package com.example.proyectoIntegrador.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImagenDTO {

        private Long imagenes_id;
        private String titulo;
        private String urlImagen;
        private Long productos_id;

}
