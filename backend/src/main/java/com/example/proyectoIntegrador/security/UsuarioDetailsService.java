package com.example.proyectoIntegrador.security;

import com.example.proyectoIntegrador.entity.Rol;
import com.example.proyectoIntegrador.entity.Usuario;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
import com.example.proyectoIntegrador.service.implementacion.RolService;
import com.example.proyectoIntegrador.service.implementacion.UsuarioService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
@Slf4j
public class UsuarioDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private RolService rolService;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {//buscar ususario por username
        Usuario usuario =usuarioService.findUsuarioByEmail(email);

        Rol rol = null;
        try {
            rol = mapper.convertValue(rolService.buscar(usuario.getRol().getId()), Rol.class);
        } catch (BadRequestException e) {
            throw new RuntimeException(e);
        }
        return new User(usuario.getEmail(),usuario.getContrasenia(),mapperRoles(rol.getNombre()));

    }
    private Collection<? extends GrantedAuthority> mapperRoles(String perfil){
        List<GrantedAuthority> authorities= Collections.singletonList(new SimpleGrantedAuthority("ROLE_"+perfil));
        return authorities;
    }
}
