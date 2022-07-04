package com.example.proyectoIntegrador.repository;

import com.example.proyectoIntegrador.entity.Politica;
import com.example.proyectoIntegrador.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPoliticaRepository extends JpaRepository<Politica,Long> {

}
