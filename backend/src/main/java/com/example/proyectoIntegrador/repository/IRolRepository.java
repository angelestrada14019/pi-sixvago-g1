package com.example.proyectoIntegrador.repository;

import com.example.proyectoIntegrador.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRolRepository extends JpaRepository<Rol,Long> {
}
