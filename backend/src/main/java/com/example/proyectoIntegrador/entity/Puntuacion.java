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
@Table(name = "puntuaciones")
public class Puntuacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "puntuacion")
    private Integer puntuacion;

    @ManyToOne
    @JoinColumn(name = "usuarios_id", nullable = false, referencedColumnName = "id")
    private Usuario usuarios;

    @ManyToOne
    @JoinColumn(name = "productos_productos_id", nullable = false, referencedColumnName = "productos_id")
    private Producto productosProductos;



}