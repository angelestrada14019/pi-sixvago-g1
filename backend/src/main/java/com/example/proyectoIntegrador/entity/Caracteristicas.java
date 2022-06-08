package com.example.proyectoIntegrador.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "caracteristicas")
public class Caracteristicas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "caracteristicas_id")
    private Long caracteristicas_id;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "icono")
    private String icono;

}
