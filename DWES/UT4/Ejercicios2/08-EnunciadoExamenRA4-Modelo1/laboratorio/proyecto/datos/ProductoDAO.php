<?php
require_once __DIR__.'/../entidades/Producto.php';

interface ProductoDAO{
    public function listAll():?array;
    public function byId(int $id):?Producto;
    public function save(Producto $producto):?Producto;
    public function update(int $id,Producto $producto):?Producto;
    public function delete(int $id):?Producto;
    public function reemplazarProducto(
        string $nombreProducto,
        string $nombreNuevoProducto, 
        float $precioNuevoProducto):?Producto;
}

?>