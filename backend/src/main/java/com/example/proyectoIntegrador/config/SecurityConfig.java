package com.example.proyectoIntegrador.config;

import com.example.proyectoIntegrador.security.JwtAuthenticationEntryPoint;
import com.example.proyectoIntegrador.security.JwtAuthenticationFilter;
import com.example.proyectoIntegrador.security.UsuarioDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity //clase de seguridad personalizada
@EnableGlobalMethodSecurity(prePostEnabled = true) //seguridad de nivel  de metodo, cprePostEnable=true habilita preAuthorize y postAuthorize
public class SecurityConfig extends WebSecurityConfigurerAdapter { //redefinir algunos de los metodos de springSecurity

    @Autowired
    private UsuarioDetailsService usuarioDetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(){
        return new JwtAuthenticationFilter();
    }

    @Bean //genere un objeto bean, se debe crear bajo la anotacion configuration
    BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    private static final String[] AUTH_WHITELIST = {
            // -- Swagger UI v2
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            // -- Swagger UI v3 (OpenAPI)
            "/v3/api-docs/**",
            "/swagger-ui/**"
            // other public endpoints of your API may be appended to this array
    };

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and()
                .csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint) //manejar excepcion
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // sin estado
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET,"/productos/**").permitAll()
                .antMatchers(HttpMethod.GET,"/ciudades/**").permitAll()
                .antMatchers(HttpMethod.GET,"/caracteristicas/**").permitAll()
                .antMatchers(HttpMethod.GET,"/categorias/**").permitAll()
                .antMatchers("/puntuacion/**").permitAll()
                .antMatchers("/auth/**").permitAll()
                .antMatchers(HttpMethod.GET,"/usuarios/**").permitAll()
                .antMatchers(HttpMethod.GET,"/reservas/**").permitAll()
                .antMatchers(AUTH_WHITELIST).permitAll()
                .anyRequest()
                .authenticated();
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class); //autenticacion por token (filtro usado y la clase del filtro
    }



    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception { //crear roles y usuarios personalizados
        auth.userDetailsService(usuarioDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {//para poder autenticarse
        return super.authenticationManagerBean();
    }
}

