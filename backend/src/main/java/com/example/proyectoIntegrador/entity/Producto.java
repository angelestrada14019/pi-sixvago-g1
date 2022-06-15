package com.example.proyectoIntegrador.entity;

import lombok.*;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "productos")
public class Producto{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productos_id")
    private Long productos_id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "politicas_servicios")
    private String politicas_servicio;

    @ManyToOne
    @JoinColumn(name = "categorias_id",referencedColumnName = "id")
    private Categoria categorias_id; //NO TOCAR

    @ManyToOne
    @JoinColumn(name = "ciudades_id", referencedColumnName = "ciudades_id")
    private Ciudad ciudades_id; //NO TOCAR

    @ManyToMany
    @JoinTable(name ="productos_caracteristicas", joinColumns = @JoinColumn(name = "productos_id"),
            inverseJoinColumns = @JoinColumn(name ="caracteristicas_id"))
    private List<Caracteristicas> caracteristicas;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "productos_id")
    private List<Imagen> listadeimagenes;



}
