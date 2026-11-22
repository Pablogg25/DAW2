<?php

require_once __DIR__ . "/../dao/ProductoDAO.php";
require_once __DIR__ . "/../entities/Producto.php";

class ProductoService
{
    private ProductoDAO $dao;

    public function __construct(
        ProductoDAO $dao
    ) {
        $this->dao = $dao;
    }

    public function altaProducto(
        int $id,
        string $nombre,
        float $precio
    ): void {

        $producto = new Producto(
            $id,
            $nombre,
            $precio
        );

        $this->dao->insertar(
            $producto
        );
    }

    public function obtenerProductos(): array
    {
        return $this->dao->obtenerTodos();
    }

    public function actualizarProducto(
        int $id,
        string $nombre,
        float $precio
    ): void {

        $producto = new Producto(
            $id,
            $nombre,
            $precio
        );

        $this->dao->actualizar(
            $producto
        );
    }

    public function borrarProducto(
        int $id
    ): void {

        $this->dao->borrar($id);
    }
}