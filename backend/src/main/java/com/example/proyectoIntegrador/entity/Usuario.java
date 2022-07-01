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
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "nombre", length = 45)
    private String nombre;

    @Column(name = "apellido", length = 45)
    private String apellido;

    @Column(name = "email", length = 45,unique = true)
    private String email;

    @Column(name = "contrasenia")
    private String contrasenia;

    @Column(name = "ciudad", length = 45)
    private String ciudad;

    @ManyToOne
    @JoinColumn(name = "roles_id", nullable = false, referencedColumnName = "id")
    private Rol rol;

    @Column(name = "enable")
    private Boolean enable;
    @Column(name = "verification_code",updatable = false)
    private String verification_code;



}