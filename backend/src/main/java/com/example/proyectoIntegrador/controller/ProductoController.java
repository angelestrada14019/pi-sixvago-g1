package com.example.proyectoIntegrador.controller;

import com.example.proyectoIntegrador.dto.ProductoDTO;
import com.example.proyectoIntegrador.dto.ReservaDTO;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.service.implementacion.ProductosService;
import com.example.proyectoIntegrador.service.implementacion.ReservaService;
import com.example.proyectoIntegrador.utils.WrapperResponse;
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
    public ResponseEntity<WrapperResponse<ProductoDTO>> agregar(@RequestBody ProductoDTO productoDTO)  {
        return  new WrapperResponse<>(true,HttpStatus.CREATED,"Succes",productoService.agregar(productoDTO)).createResponse(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<WrapperResponse<List<ProductoDTO>>> listarTodos(){
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",productoService.listarTodos()).createResponse(HttpStatus.OK);
    }

    @GetMapping("/ciudad")
    public ResponseEntity<WrapperResponse<List<ProductoDTO>>> findByNombreCiudad(@RequestParam String nombreCiudad) {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",productoService.findByNombreCiudad(nombreCiudad)).createResponse(HttpStatus.OK);
    }
    @GetMapping("/categorias")
    public ResponseEntity<WrapperResponse<List<ProductoDTO>>> findByTituloCategoria(@RequestParam String tituloCategoria) {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",productoService.findByTituloCategoria(tituloCategoria)).createResponse(HttpStatus.OK);
    }
    @GetMapping("/fecha")
    public ResponseEntity<WrapperResponse<List<ProductoDTO>>> buscarProductosFechaIF(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fechaInicial,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fechaFinal) {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",productoService.buscarProductosFechaIF(fechaInicial,fechaFinal)).createResponse(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WrapperResponse<ProductoDTO>> buscar(@PathVariable Long id) {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",productoService.buscar(id)).createResponse(HttpStatus.OK);
    }
    @PutMapping()
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<WrapperResponse<ProductoDTO>> editar(@RequestBody ProductoDTO productoDTO) {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",productoService.editar(productoDTO)).createResponse(HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<WrapperResponse<String>>  eliminar(@PathVariable Long id) {
        if (productoService.buscar(id) != null) {
            productoService.eliminar(id);
        } else {
            throw new NoDataFoundExceptions("no existe producto con ese id");
        }
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes","eliminado").createResponse(HttpStatus.OK);
    }

}
