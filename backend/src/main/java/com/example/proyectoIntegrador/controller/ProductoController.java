package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.ProductoDTO;
import com.example.proyectoIntegrador.entity.Producto;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
import com.example.proyectoIntegrador.service.implementacion.ProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductosService productoService;

    @PostMapping()
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

    @GetMapping("/{id}")
    public ResponseEntity buscar(@PathVariable Long id) throws BadRequestException {
        return ResponseEntity.ok(productoService.buscar(id));
    }
    @PutMapping()
    public ResponseEntity editar(@RequestBody ProductoDTO productoDTO) throws BadRequestException {
        return ResponseEntity.ok(productoService.editar(productoDTO));
    }
    @DeleteMapping("/{id}")
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
