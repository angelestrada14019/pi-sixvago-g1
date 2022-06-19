package com.example.proyectoIntegrador.controller;
import com.example.proyectoIntegrador.dto.ProductoDTO;
import com.example.proyectoIntegrador.dto.ReservaDTO;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
import com.example.proyectoIntegrador.service.implementacion.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {
    @Autowired
    private ReservaService reservaService;

    @GetMapping("/{id}")
    public ResponseEntity buscar(@PathVariable Long id) throws BadRequestException {
        return ResponseEntity.ok(reservaService.buscar(id));
    }
    @PutMapping()
    @PreAuthorize("hasAnyRole('admin')")
    public ResponseEntity editar(@RequestBody ReservaDTO reservaDTO) throws BadRequestException {
        return ResponseEntity.ok(reservaService.editar(reservaDTO));
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('admin','cliente')")
    public ResponseEntity<String> eliminar(@PathVariable Long id) throws BadRequestException {
        ResponseEntity<String> response = null;
        if (reservaService.buscar(id) != null) {
            reservaService.eliminar(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Eliminado");
        } else {
            throw new BadRequestException("no existe la reserva con ese id");
        }
        return response;
    }
    @GetMapping()
    public ResponseEntity listarTodos(){
        return ResponseEntity.ok(reservaService.listarTodos());
    }
    @PostMapping()
    @PreAuthorize("hasAnyRole('admin','cliente')")
    public ResponseEntity agregar(@RequestBody ReservaDTO reservaDTO) throws BadRequestException{
        return ResponseEntity.status(HttpStatus.CREATED).body(reservaService.agregar(reservaDTO));
    }

    @GetMapping("/productos")
    public ResponseEntity <List<ReservaDTO>> buscarReservaPorProductoId(@RequestParam Long idproducto) {
        return ResponseEntity.ok(reservaService.buscarReservaPorProductoId(idproducto));
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> procesarErrorBadRequest(BadRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
