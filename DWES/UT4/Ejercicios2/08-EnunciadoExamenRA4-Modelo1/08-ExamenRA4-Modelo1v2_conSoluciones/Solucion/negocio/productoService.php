<?php

require_once __DIR__ . "/../datos/productoDAO.php";
require_once __DIR__ . "/../entidades/Producto.php";

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

    /**
     * Reemplaza un producto por otro (borrar + insertar) en una única
     * transacción. La atomicidad la garantiza la capa de datos; aquí se
     * validan las reglas de negocio ANTES de tocar el almacenamiento.
     *
     * @throws Exception si los datos no son válidos o la operación falla
     *                   (en ese caso los datos no se han modificado)
     */
    public function reemplazarProducto(
        string $nombreAntiguo,
        string $nombreNuevo,
        float $precio
    ): void {

        $nombreAntiguo = trim($nombreAntiguo);
        $nombreNuevo = trim($nombreNuevo);

        if ($nombreAntiguo === "" || $nombreNuevo === "") {

            throw new Exception(
                "Los nombres no pueden estar vacíos"
            );
        }

        if ($precio < 0) {

            throw new Exception(
                "El precio no puede ser negativo"
            );
        }

        $this->dao->reemplazarProducto(
            $nombreAntiguo,
            new Producto(0, $nombreNuevo, $precio)
        );
    }
}