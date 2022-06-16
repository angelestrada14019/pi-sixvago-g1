package com.example.proyectoIntegrador.repository;

import com.example.proyectoIntegrador.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IProductoRepository extends JpaRepository<Producto,Long> {

    @Query(value = "SELECT p FROM Producto p where p.ciudades_id.nombre =?1")
    List<Producto> buscarCiudad(String nombre);
    @Query(value = "SELECT p FROM Producto p where p.categorias_id.titulo =?1")
    List<Producto> buscarCategoria(String titulo);


}
