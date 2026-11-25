<?php

require_once __DIR__ . "/../entidades/Producto.php";

interface ProductoDAO
{
    public function obtenerTodos(): array;

    public function obtenerPorId(
        int $id
    ): ?Producto;

    public function insertar(
        Producto $producto
    ): void;

    public function actualizar(
        Producto $producto
    ): void;

    public function borrar(
        int $id
    ): void;

    /**
     * Sustituye un producto por otro de forma ATÓMICA:
     *   1) elimina el producto cuyo nombre es $nombreAntiguo
     *   2) inserta el producto $nuevo
     *
     * O se completan las dos acciones (commit) o no se aplica ninguna
     * (rollback). Si el producto antiguo no existe o cualquiera de los
     * pasos falla, se lanza una excepción y los datos quedan exactamente
     * como estaban antes de la llamada.
     *
     * @throws Throwable si alguna de las acciones falla (tras el rollback)
     */
    public function reemplazarProducto(
        string $nombreAntiguo,
        Producto $nuevo
    ): void;
}
