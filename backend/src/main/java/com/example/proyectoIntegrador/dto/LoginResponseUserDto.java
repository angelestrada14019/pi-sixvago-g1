package com.example.proyectoIntegrador.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseUserDto {
    private UsuarioDTO usuarioDto;
    private String token;
}
