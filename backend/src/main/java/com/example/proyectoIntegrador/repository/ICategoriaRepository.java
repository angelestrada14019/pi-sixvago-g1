package com.example.proyectoIntegrador.repository;

import com.example.proyectoIntegrador.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoriaRepository extends JpaRepository<Categoria,Long> {
}
