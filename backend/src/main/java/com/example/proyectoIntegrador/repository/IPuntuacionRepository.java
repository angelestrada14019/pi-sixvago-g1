package com.example.proyectoIntegrador.repository;

import com.example.proyectoIntegrador.entity.Puntuacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPuntuacionRepository extends JpaRepository<Puntuacion,Long> {

    List<Puntuacion> findByUsuariosId(Long usuariorId);

    @Query(value = "SELECT p FROM Puntuacion p where p.productosProductos.productos_id =?1")
    List<Puntuacion> findByProductoId(Long productoId);

}
