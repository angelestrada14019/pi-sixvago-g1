package com.example.proyectoIntegrador.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

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
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
//@JsonFormat
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "hora_comienzo_reserva", nullable = false, length = 45)
//    @DateTimeFormat(pattern = "hh-mm-ss",iso = DateTimeFormat.ISO.TIME)
    private LocalTime horaComienzoReserva;

    @Column(name = "fecha_inicial_reserva", nullable = false, length = 45)
//    @DateTimeFormat(pattern = "yyyy-mm-dd",iso = DateTimeFormat.ISO.DATE)
    private LocalDate fechaInicialReserva;

    @Column(name = "fecha_final_reserva", nullable = false, length = 45)
//    @DateTimeFormat(pattern = "yyyy-mm-dd",iso = DateTimeFormat.ISO.DATE)
    private LocalDate fechaFinalReserva;

    @Column(name = "vacuna_covid")
    private Boolean vacunaCovid;

    @Column(name = "datos_para_vendedor")
    private String datosParaVendedor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "productos_productos_id", nullable = false,referencedColumnName = "productos_id")
    private Producto productosProductos;

    @ManyToOne
    @JoinColumn(name = "usuarios_id", nullable = false, referencedColumnName = "id")
    private Usuario usuarios;



}