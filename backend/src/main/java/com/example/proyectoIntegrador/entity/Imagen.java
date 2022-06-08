package com.example.proyectoIntegrador.entity;

import lombok.*;

import javax.persistence.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "imagenes")
public class Imagen{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "imagenes_id")
    private Long imagenes_id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "url")
    private String urlImagen;

    @Column(name = "productos_id")
    private Long productos_id;
}
