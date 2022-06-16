package com.example.proyectoIntegrador.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UsuarioDetailsService usuarioDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        //obtener el token
        String token = obtainJwtFromRequest(request);
        //validar token
        try {
            if (StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {
                //obtener el username del token
                String username = jwtTokenProvider.getEmailFromToken(token);
                //cargar usuario asociado al token
                UserDetails userDetails = usuarioDetailsService.loadUserByUsername(username);
                //autenticar al usuario con el token
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails,null,  userDetails.getAuthorities());
                //detalles adicionales sobre la solicitud de autenticación. Estos pueden ser una dirección IP, número de serie del certificado
                //authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                //establecer seguridad
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }catch (Exception e){
            log.error("Error al autenticar al usuario",e);
        }
        //validar filtro
        filterChain.doFilter(request,response);

    }
    //Bearer token de acceso, formato de autorizacion de un usuario
    private String obtainJwtFromRequest(HttpServletRequest request){
        String bearerToken=request.getHeader("Authorization"); //header de la solicitud
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7,bearerToken.length()); //eliminar "bearer " y obtener el token
        }
        return null;
    }
}
