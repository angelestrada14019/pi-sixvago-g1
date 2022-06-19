package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.ProductoDTO;
import com.example.proyectoIntegrador.entity.Producto;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
import com.example.proyectoIntegrador.service.implementacion.ProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductosService productoService;

    @PostMapping()
    @PreAuthorize("hasRole('admin')")
public ResponseEntity agregar(@RequestBody ProductoDTO productoDTO) throws BadRequestException {
        return new ResponseEntity<ProductoDTO>(productoService.agregar(productoDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity listarTodos(){
        return ResponseEntity.ok(productoService.listarTodos());
    }

    @GetMapping("/ciudad")
    public ResponseEntity <List<ProductoDTO>> findByNombreCiudad(@RequestParam String nombreCiudad) {
        return ResponseEntity.ok(productoService.findByNombreCiudad(nombreCiudad));
    }
    @GetMapping("/categorias")
    public ResponseEntity <List<ProductoDTO>> findByTituloCategoria(@RequestParam String tituloCategoria) {
        return ResponseEntity.ok(productoService.findByTituloCategoria(tituloCategoria));
    }
    @GetMapping("/fecha")
    public ResponseEntity <List<ProductoDTO>> buscarProductosFechaIF(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fechaInicial,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fechaFinal) {
        return ResponseEntity.ok(productoService.buscarProductosFechaIF(fechaInicial,fechaFinal));
    }

    @GetMapping("/{id}")
    public ResponseEntity buscar(@PathVariable Long id) throws BadRequestException {
        return ResponseEntity.ok(productoService.buscar(id));
    }
    @PutMapping()
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity editar(@RequestBody ProductoDTO productoDTO) throws BadRequestException {
        return ResponseEntity.ok(productoService.editar(productoDTO));
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<String> eliminar(@PathVariable Long id) throws BadRequestException {
        ResponseEntity<String> response = null;
        if (productoService.buscar(id) != null) {
            productoService.eliminar(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Eliminado");
        } else {
            throw new BadRequestException("no existe producto con ese id");
        }
        return response;
    }
}
