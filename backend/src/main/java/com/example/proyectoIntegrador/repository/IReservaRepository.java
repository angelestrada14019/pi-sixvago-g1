package com.example.proyectoIntegrador.repository;

import com.example.proyectoIntegrador.entity.Producto;
import com.example.proyectoIntegrador.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IReservaRepository extends JpaRepository<Reserva,Long> {

    @Query(value = "SELECT r FROM Reserva r where r.productosProductos.productos_id =?1")
    List<Reserva> buscarReservaPorProductoId(Long id);
    @Query(value = "SELECT r FROM Reserva r where r.usuarios.id =?1")
    List<Reserva> reservasPorIdUsuario(Long id);



}
