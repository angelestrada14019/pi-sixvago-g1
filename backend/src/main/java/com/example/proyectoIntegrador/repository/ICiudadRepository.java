package com.example.proyectoIntegrador.repository;

import com.example.proyectoIntegrador.entity.Ciudad;
import com.example.proyectoIntegrador.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICiudadRepository extends JpaRepository<Ciudad, Long> {

        //List<Producto>findProductosByCiudadNombre(String nombre);

        //@Query("select Producto p from Ciudad c where c.nombre=?1")
        //public Odontologo findByMatricula(String matricula);
}
