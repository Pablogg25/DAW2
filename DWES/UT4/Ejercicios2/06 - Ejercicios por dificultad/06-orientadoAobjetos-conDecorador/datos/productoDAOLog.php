<?php

require_once __DIR__ . "/ProductoDAO.php";

/**
 * Clase que implementa el patrón de diseño Decorator para añadir funcionalidad de logging 
 * a un DAO de productos sin tener que modificar la implementación original del DAO (O de SOLID).
 */
class ProductoDAOLog implements ProductoDAO
{
    private ProductoDAO $dao;

    public function __construct(
        ProductoDAO $dao
    ) {
        $this->dao = $dao;
    }

    private function escribirLog(
        string $mensaje
    ): void {

        file_put_contents(
            __DIR__ . "/../log.txt",
            date("Y-m-d H:i:s")
            . " - "
            . $mensaje
            . PHP_EOL,
            FILE_APPEND
        );
    }

    public function obtenerTodos(): array
    {
        /* ESTE SALDRÍA DUPLICADO EN EL LOG, POR EL REDIRECT DE index.php
            POR ESO LO OMITIMOS */
        /* $this->escribirLog(
            "CONSULTAR PRODUCTOS"
        ); */

        return $this->dao->obtenerTodos();
    }

    public function obtenerPorId(
        int $id
    ): ?Producto {

        $this->escribirLog(
            "CONSULTAR PRODUCTO ID=$id"
        );

        return $this->dao->obtenerPorId(
            $id
        );
    }

    public function insertar(
        Producto $producto
    ): void {

        $this->escribirLog(
            "INSERTAR PRODUCTO "
            . $producto->nombre
        );

        $this->dao->insertar(
            $producto
        );
    }

    public function actualizar(
        Producto $producto
    ): void {

        $this->escribirLog(
            "ACTUALIZAR PRODUCTO ID="
            . $producto->id
            . " NOMBRE="
            . $producto->nombre
        );

        $this->dao->actualizar(
            $producto
        );
    }

    public function borrar(
        int $id
    ): void {

        $this->escribirLog(
            "BORRAR PRODUCTO ID=$id"
        );

        $this->dao->borrar(
            $id
        );
    }
}