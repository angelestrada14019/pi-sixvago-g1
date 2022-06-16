package com.example.proyectoIntegrador.repository;

import com.example.proyectoIntegrador.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario,Long> {

    Usuario findUsuarioByEmail(String email);
    Boolean existsUsuarioByEmail(String email);
}
