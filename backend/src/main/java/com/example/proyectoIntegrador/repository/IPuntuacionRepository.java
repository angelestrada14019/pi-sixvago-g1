package com.example.proyectoIntegrador.repository;

import com.example.proyectoIntegrador.entity.Puntuacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPuntuacionRepository extends JpaRepository<Puntuacion,Long> {
}
