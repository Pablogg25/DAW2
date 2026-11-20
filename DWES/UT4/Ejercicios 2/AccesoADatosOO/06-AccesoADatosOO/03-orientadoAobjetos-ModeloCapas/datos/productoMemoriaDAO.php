<?php

require_once __DIR__ . "/../dao/ProductoDAO.php";
require_once __DIR__ . "/../entities/Producto.php";

class ProductoMemoriaDAO
    implements ProductoDAO
{
    private array $productos = [];

    public function obtenerTodos(): array
    {
        return $this->productos;
    }

    public function obtenerPorId(
        int $id
    ): ?Producto {

        foreach ($this->productos as $producto) {

            if ($producto->id == $id) {
                return $producto;
            }

        }

        return null;
    }

    public function insertar(
        Producto $producto
    ): void {

        $this->productos[] = $producto;
    }

    public function actualizar(
        Producto $producto
    ): void {

        foreach ($this->productos as $i => $p) {

            if ($p->id == $producto->id) {

                $this->productos[$i] = $producto;
                return;
            }

        }
    }

    public function borrar(
        int $id
    ): void {

        $this->productos = array_filter(
            $this->productos,
            fn($p) => $p->id != $id
        );
    }
}