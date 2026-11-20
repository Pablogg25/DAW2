<?php

require_once __DIR__ . "/../datos/ProductoDAO.php";

class ProductoService
{
    private ProductoDAO $dao;

    public function __construct(
        ProductoDAO $dao
    ) {
        $this->dao = $dao;
    }

    public function altaProducto(
        Producto $producto
    ): void {

        if ($producto->precio < 0) {
            throw new Exception(
                "El precio no puede ser negativo"
            );
        }

        $this->dao->insertar(
            $producto
        );
    }

    public function actualizarProducto(
        Producto $producto
    ): void {

        $this->dao->actualizar(
            $producto
        );
    }

    public function borrarProducto(
        int $id
    ): void {

        $this->dao->borrar($id);
    }

    public function obtenerProductos(): array
    {
        return $this->dao->obtenerTodos();
    }
}