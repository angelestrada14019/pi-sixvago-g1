package com.example.proyectoIntegrador.repository;

import com.example.proyectoIntegrador.entity.Politica;
import com.example.proyectoIntegrador.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IPoliticaRepository extends JpaRepository<Politica,Long> {

    List<Politica> findByTipoDePoliticaId(Long id);

}
