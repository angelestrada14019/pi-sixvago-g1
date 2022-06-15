package com.example.proyectoIntegrador.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "hora_comienzo_reserva", nullable = false, length = 45)
    private LocalTime horaComienzoReserva;

    @Column(name = "fecha_inicial_reserva", nullable = false, length = 45)
    private LocalDate fechaInicialReserva;

    @Column(name = "fecha_final_reserva", nullable = false, length = 45)
    private LocalDate fechaFinalReserva;

    @Column(name = "vacuna_covid")
    private Boolean vacunaCovid;

    @Column(name = "datos_para_vendedor")
    private String datosParaVendedor;

    @ManyToOne
    @JoinColumn(name = "productos_productos_id", nullable = false,referencedColumnName = "productos_id")
    private Producto productosProductos;

    @ManyToOne
    @JoinColumn(name = "usuarios_id", nullable = false, referencedColumnName = "id")
    private Usuario usuarios;



}