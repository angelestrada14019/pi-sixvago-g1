package com.example.proyectoIntegrador.repository;

import com.example.proyectoIntegrador.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario,Long> {

    Usuario findUsuarioByEmail(String email);
    Boolean existsUsuarioByEmail(String email);
    @Query(value = "SELECT u FROM Usuario u where u.verification_code =?1")
    Usuario buscarUsuarioPorCodigo(String code);
}
