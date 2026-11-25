<?php

require_once __DIR__ . "/productoDAO.php";

class ProductoPDODAO implements ProductoDAO
{
    private PDO $conexion;

    public function __construct(
        PDO $conexion
    ) {
        $this->conexion = $conexion;
    }

    public function obtenerTodos(): array
    {
        $consulta = $this->conexion->query(
            "SELECT * FROM productos"
        );

        $filas = $consulta->fetchAll(
            PDO::FETCH_ASSOC
        );

        $productos = [];

        foreach ($filas as $fila) {

            $productos[] = new Producto(
                $fila["id"],
                $fila["nombre"],
                $fila["precio"]
            );
        }

        return $productos;
    }

    public function obtenerPorId(
        int $id
    ): ?Producto {

        $consulta = $this->conexion->prepare(
            "SELECT *
             FROM productos
             WHERE id = ?"
        );

        $consulta->execute([$id]);

        $fila = $consulta->fetch(
            PDO::FETCH_ASSOC
        );

        if ($fila === false) {
            return null;
        }

        return new Producto(
            $fila["id"],
            $fila["nombre"],
            $fila["precio"]
        );
    }

    public function insertar(
        Producto $producto
    ): void {

            $consulta = $this->conexion->prepare(
                "INSERT INTO productos(nombre, precio)
                 VALUES (?, ?)"
            );

            $consulta->execute([
                $producto->nombre,
                $producto->precio
            ]);

    }

    public function actualizar(
        Producto $producto
    ): void {

            $consulta = $this->conexion->prepare(
                "UPDATE productos
                 SET nombre = ?,
                     precio = ?
                 WHERE id = ?"
            );

            $consulta->execute([
                $producto->nombre,
                $producto->precio,
                $producto->id
            ]);

    }

    public function borrar(
        int $id
    ): void {

            $consulta = $this->conexion->prepare(
                "DELETE FROM productos
                 WHERE id = ?"
            );

            $consulta->execute([$id]);

    }

    /**
     * Reemplaza un producto dentro de UNA ÚNICA TRANSACCIÓN:
     * borrar el antiguo + insertar el nuevo.
     * Si algo falla -> rollBack() y la BD queda como estaba.
     * Si todo va bien -> commit().
     *
     * Funciona igual en SQLite y en MySQL (InnoDB).
     */
    public function reemplazarProducto(
        string $nombreAntiguo,
        Producto $nuevo
    ): void {

        $this->conexion->beginTransaction();

        try {

            // 1) Eliminar el producto antiguo
            $borrado = $this->conexion->prepare(
                "DELETE FROM productos
                 WHERE nombre = ?"
            );

            $borrado->execute([$nombreAntiguo]);

            // Si no existía, no hay nada que reemplazar: se considera fallo
            if ($borrado->rowCount() === 0) {

                throw new RuntimeException(
                    "No existe ningún producto con nombre '"
                    . $nombreAntiguo
                    . "'"
                );
            }

            // 2) Insertar el producto nuevo
            $insercion = $this->conexion->prepare(
                "INSERT INTO productos(nombre, precio)
                 VALUES (?, ?)"
            );

            $insercion->execute([
                $nuevo->nombre,
                $nuevo->precio
            ]);

            // Informamos del id que ha generado la BD
            $nuevo->id = (int) $this->conexion->lastInsertId();

            // Ambas acciones correctas -> confirmar
            $this->conexion->commit();

        } catch (Throwable $e) {

            // Cualquier fallo -> deshacer TODO y propagar el error
            if ($this->conexion->inTransaction()) {
                $this->conexion->rollBack();
            }

            throw $e;
        }
    }
}