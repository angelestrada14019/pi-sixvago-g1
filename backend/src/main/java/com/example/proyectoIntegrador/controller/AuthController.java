package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.LoginRequestDto;
import com.example.proyectoIntegrador.dto.LoginResponseUserDto;
import com.example.proyectoIntegrador.dto.UsuarioDTO;
import com.example.proyectoIntegrador.entity.Usuario;
import com.example.proyectoIntegrador.security.JwtTokenProvider;
import com.example.proyectoIntegrador.service.implementacion.UsuarioService;
import com.example.proyectoIntegrador.utils.WrapperResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Slf4j
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UsuarioService usuarioService;




    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private ObjectMapper mapper;

    @PostMapping("login")
    public ResponseEntity<WrapperResponse<LoginResponseUserDto>> login(@RequestBody LoginRequestDto loginRequestDto){
        Usuario usuario = usuarioService.findUsuarioByEmail(loginRequestDto.getEmail());
        UsuarioDTO usuarioDto =mapper.convertValue(usuario,UsuarioDTO.class);

        Authentication authentication=authenticationManager.authenticate(new
                UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(),loginRequestDto.getContrasenia()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        //obtener token
        String token = jwtTokenProvider.generateToken(authentication);

        LoginResponseUserDto loginResponseUserDto =new LoginResponseUserDto(usuarioDto,token);
        return  new WrapperResponse<>(true,HttpStatus.OK,"Auth Succes",loginResponseUserDto).createResponse(HttpStatus.OK);
    }

    @PostMapping("register")
    public ResponseEntity<?> signUn(@RequestBody UsuarioDTO usuarioDto)  {
        if(usuarioService.existsUsuarioByEmail(usuarioDto.getEmail())){
            return  new ResponseEntity<>("el usuario ya existe",HttpStatus.BAD_REQUEST);
        }
        Usuario usuarioS= mapper.convertValue(usuarioDto,Usuario.class);
        usuarioS.setContrasenia(passwordEncoder.encode(usuarioS.getContrasenia()));
        UsuarioDTO usuarioDTO =usuarioService.agregar(mapper.convertValue(usuarioS,UsuarioDTO.class));
        Authentication authentication=authenticationManager.authenticate(new
                UsernamePasswordAuthenticationToken(usuarioDto.getEmail(),usuarioDto.getContrasenia()));
        String token = jwtTokenProvider.generateToken(authentication);
        LoginResponseUserDto loginResponseUserDto =new LoginResponseUserDto(usuarioDTO,token);
        return  new WrapperResponse<>(true,HttpStatus.CREATED,"Register Succes",loginResponseUserDto).createResponse(HttpStatus.CREATED);
    }
}
