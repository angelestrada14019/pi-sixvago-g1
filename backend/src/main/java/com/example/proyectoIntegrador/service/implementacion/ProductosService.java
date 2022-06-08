package com.example.proyectoIntegrador.service.implementacion;

import com.example.proyectoIntegrador.dto.ProductoDTO;
import com.example.proyectoIntegrador.entity.Producto;
import com.example.proyectoIntegrador.exceptions.BadRequestException;
import com.example.proyectoIntegrador.repository.IProductoRepository;
import com.example.proyectoIntegrador.service.IGeneralService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductosService implements IGeneralService<ProductoDTO, Long> {

    @Autowired
    private IProductoRepository repository;
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private CategoriaService categoriaService;
    @Autowired
    private CiudadService ciudadService;


    @Override
    public ProductoDTO agregar(ProductoDTO productoDTO) throws BadRequestException{
        Producto producto = mapper.convertValue(productoDTO, Producto.class);
        return mapper.convertValue(repository.save(producto), ProductoDTO.class);
    }
    /*public Producto agregar2(ProductoDTO productoDTO) throws BadRequestException{
        Producto producto = new Producto();
        System.out.println(productoDTO.getCategorias_id());
        producto.setCategorias_id(productoDTO.getCategorias_id());//error de ciudades null
        producto.setCiudades_id(productoDTO.getCiudades_id());//descripcion null
        producto.setDescripcion(productoDTO.getDescripcion());//direccion null
        producto.setDireccion(productoDTO.getDireccion());//nombre cannot be null
        producto.setNombre(productoDTO.getNombre());
        producto.setPoliticas_servicio(productoDTO.getPoliticas_servicio());*/

        /*producto.builder()
                .nombre(productoDTO.getNombre())
                .descripcion(productoDTO.getDescripcion())
                .direccion(productoDTO.getDireccion())
                .politicas_servicio(productoDTO.getPoliticas_servicio())
                .categorias_id(productoDTO.getCategorias_id())
                .ciudades_id(productoDTO.getCiudades_id())
                .build();*/
        /*System.out.println("porque no funciona?");
        System.out.println(producto);
        return repository.save(producto);*/

    @Override
    public ProductoDTO buscar(Long aLong) throws BadRequestException {
        Optional<Producto> producto = repository.findById(aLong);
        if(producto.isPresent()){
            return mapper.convertValue(producto.get(), ProductoDTO.class);
        }
        throw new BadRequestException("No se encontro el producto");
    }

    @Override
    public ProductoDTO editar(ProductoDTO productoDTO) throws BadRequestException {
        Producto producto = mapper.convertValue(productoDTO, Producto.class);
        return mapper.convertValue(repository.save(producto), ProductoDTO.class);
    }

    @Override
    public List<ProductoDTO> listarTodos() {
        List<ProductoDTO> producto = new ArrayList<>();
        List <Producto> productos = repository.findAll();
        for(Producto p: productos){
            producto.add(mapper.convertValue(p, ProductoDTO.class));
        }
        return producto;
    }


    @Override
    public void eliminar(Long aLong) throws BadRequestException {
        Optional<Producto> producto = repository.findById(aLong);
        if(producto.isPresent())
            repository.deleteById(aLong);
    }
    public List<ProductoDTO> findByNombreCiudad(String nombreCiudad){
        List<ProductoDTO> productoDTO = new ArrayList<>();
        List<Producto> productos = repository.buscarCiudad(nombreCiudad);
        for (Producto producto : productos) {
            productoDTO.add(mapper.convertValue(producto, ProductoDTO.class));
        }
        return productoDTO;
    }
    public List<ProductoDTO> findByTituloCategoria(String tituloCategoria){
        List<ProductoDTO> productoDTO = new ArrayList<>();
        List<Producto> productos = repository.buscarCategoria(tituloCategoria);
        for (Producto producto : productos) {
            productoDTO.add(mapper.convertValue(producto, ProductoDTO.class));
        }
        return productoDTO;
    }
}
