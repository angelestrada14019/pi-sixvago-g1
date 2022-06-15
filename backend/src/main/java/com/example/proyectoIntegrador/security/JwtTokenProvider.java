package com.example.proyectoIntegrador.security;

import com.example.proyectoIntegrador.exceptions.ValidateServiceExceptions;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@Slf4j
public class JwtTokenProvider {//se va a generar el token, obtener y geenrar las 3 etapas de un token
    @Value("${app.jwt-secret}")
    private String jwtSecret;
    @Value("${app.jwt-expiration-milliseconds}")
    private Integer jwtExpiration;

    public String generateToken(Authentication authentication){
        // token -> JOSE(algoritmo y tipo de token), Claims(Usuario, fecha expiracion), Hash(secretKey con CLaim y header)
        String username=authentication.getName(); //obtener usuario cuando se autentica
        Date fechaActual=new Date();
        Date fechaExpiracion =new Date(fechaActual.getTime()+jwtExpiration); //fecha de expiracion
        String token = Jwts.builder().setSubject(username).setIssuedAt(new Date()).setExpiration(fechaExpiracion)
                .signWith(SignatureAlgorithm.HS512,jwtSecret).compact(); //el token contendra el algoritmo de hash, usuario y fecha de expiracion, y con que clave secrta se va a hashear
        return token;
    }
    public String getEmailFromToken(String token){
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public Boolean validateToken(String token){
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        }catch (SignatureException e){
            log.error("firma no valida "+e.getMessage());
            throw new ValidateServiceExceptions("firma jwt no valida");
        }catch (MalformedJwtException e){
            log.error("token no valido "+e.getMessage());
            throw new ValidateServiceExceptions("Token jwt no valido");
        }catch (ExpiredJwtException e){
            log.error("token caducado "+e.getMessage());
            throw new ValidateServiceExceptions("Token jwt caducado");
        }catch (UnsupportedJwtException e){
            log.error("token no compatible "+e.getMessage());
            throw new ValidateServiceExceptions("Token jwt no compatible");
        }catch (IllegalArgumentException e){
            log.error("La cadena esta vacia "+e.getMessage());
            throw new ValidateServiceExceptions("La cadena del pyload esta vacia");
        }
    }
}
