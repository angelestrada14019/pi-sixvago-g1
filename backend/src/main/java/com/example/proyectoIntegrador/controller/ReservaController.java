package com.example.proyectoIntegrador.controller;
import com.example.proyectoIntegrador.dto.ReservaDTO;
import com.example.proyectoIntegrador.exceptions.NoDataFoundExceptions;
import com.example.proyectoIntegrador.service.implementacion.ReservaService;
import com.example.proyectoIntegrador.utils.WrapperResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Wrapper;
import java.util.List;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {
    @Autowired
    private ReservaService reservaService;

    @GetMapping("/{id}")
    public ResponseEntity<WrapperResponse<ReservaDTO>> buscar(@PathVariable Long id) {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",reservaService.buscar(id)).createResponse(HttpStatus.OK);
    }
    @PutMapping()
    @PreAuthorize("hasAnyRole('admin')")
    public ResponseEntity<WrapperResponse<ReservaDTO>> editar(@RequestBody ReservaDTO reservaDTO)  {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",reservaService.editar(reservaDTO)).createResponse(HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('admin','cliente')")
    public ResponseEntity<WrapperResponse<String>>eliminar(@PathVariable Long id) {
        if (reservaService.buscar(id) != null) {
            reservaService.eliminar(id);
        } else {
            throw new NoDataFoundExceptions("no existe la reserva con ese id");
        }
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes","eliminado").createResponse(HttpStatus.OK);
    }
    @GetMapping()
    public ResponseEntity<WrapperResponse<List<ReservaDTO>>> listarTodos(){
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",reservaService.listarTodos()).createResponse(HttpStatus.OK);
    }
    @PostMapping()
    @PreAuthorize("hasAnyRole('admin','cliente')")
    public ResponseEntity<WrapperResponse<ReservaDTO>> agregar(@RequestBody ReservaDTO reservaDTO){
        return  new WrapperResponse<>(true,HttpStatus.CREATED,"Succes",reservaService.agregar(reservaDTO)).createResponse(HttpStatus.CREATED);
    }

    @GetMapping("/productos")
    public ResponseEntity<WrapperResponse<List<ReservaDTO>>> buscarReservaPorProductoId(@RequestParam Long idproducto) {
        return  new WrapperResponse<>(true,HttpStatus.OK,"Succes",reservaService.buscarReservaPorProductoId(idproducto)).createResponse(HttpStatus.OK);
    }

    @GetMapping("/usuario")
    public ResponseEntity<WrapperResponse<List<ReservaDTO>>> reservasPorIdUsuario(@RequestParam Long id){
        return new WrapperResponse<>(true, HttpStatus.OK, "Succes", reservaService.reservasPorIdUsuario(id)).createResponse(HttpStatus.OK);
    }

}
