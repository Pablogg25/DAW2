<?php

require_once __DIR__
    . "/PeliculaDAO.php";

class PeliculaPDODAO
    implements PeliculaDAO
{
    private PDO $conexion;

    public function __construct(
        PDO $conexion
    ) {
        $this->conexion =
            $conexion;
    }

    public function obtenerTodas(): array
    {
        $consulta =
            $this->conexion->query(
                "SELECT *
                 FROM peliculas
                 ORDER BY titulo"
            );

        $filas =
            $consulta->fetchAll(
                PDO::FETCH_ASSOC
            );

        $peliculas = [];

        foreach ($filas as $fila) {

            $peliculas[] =
                new Pelicula(
                    $fila["id"],
                    $fila["titulo"],
                    (float)$fila["precio"],
                    $fila["entradas_disponibles"]
                );
        }

        return $peliculas;
    }

    public function obtenerPorId(
        int $id
    ): ?Pelicula {

        $consulta =
            $this->conexion->prepare(
                "SELECT *
                 FROM peliculas
                 WHERE id=?"
            );

        $consulta->execute([$id]);

        $fila =
            $consulta->fetch(
                PDO::FETCH_ASSOC
            );

        if (!$fila) {

            return null;
        }

        return new Pelicula(
            $fila["id"],
            $fila["titulo"],
            (float)$fila["precio"],
            $fila["entradas_disponibles"]
        );
    }

    public function insertar(
        Pelicula $pelicula
    ): void {

        $consulta =
            $this->conexion->prepare(
                "INSERT INTO peliculas
                (
                    titulo,
                    precio,
                    entradas_disponibles
                )
                VALUES
                (?, ?, ?)"
            );

        $consulta->execute([
            $pelicula->titulo,
            $pelicula->precio,
            $pelicula->entradasDisponibles
        ]);
    }

    public function actualizar(
        Pelicula $pelicula
    ): void {

        $consulta =
            $this->conexion->prepare(
                "UPDATE peliculas
                 SET
                    precio = ?,
                    entradas_disponibles = ?
                 WHERE id = ?"
            );

        $consulta->execute([
            $pelicula->precio,
            $pelicula->entradasDisponibles,
            $pelicula->id
        ]);
    }

    public function borrar(
        int $id
    ): void {

        $consulta =
            $this->conexion->prepare(
                "DELETE
                 FROM peliculas
                 WHERE id=?"
            );

        $consulta->execute([
            $id
        ]);
    }

    public function venderEntradas(
        int $peliculaId,
        string $comprador,
        int $cantidad
    ): void {

        $pelicula =
            $this->obtenerPorId(
                $peliculaId
            );

        if ($pelicula === null) {

            throw new Exception(
                "Película inexistente"
            );
        }

        if ($cantidad < 1) {

            throw new Exception(
                "Cantidad incorrecta"
            );
        }

        if (
            $cantidad >
            $pelicula->entradasDisponibles
        ) {

            throw new Exception(
                "No quedan suficientes entradas"
            );
        }

        $total =
            $cantidad
            * $pelicula->precio;

        try {

            $this->conexion
                ->beginTransaction();

            $consulta =
                $this->conexion->prepare(
                    "UPDATE peliculas
                     SET
                         entradas_disponibles =
                         entradas_disponibles - ?
                     WHERE id = ?"
                );

            $consulta->execute([
                $cantidad,
                $peliculaId
            ]);

            $consulta =
                $this->conexion->prepare(
                    "INSERT INTO ventas
                    (
                        pelicula_id,
                        comprador,
                        cantidad,
                        total
                    )
                    VALUES
                    (?, ?, ?, ?)"
                );

            $consulta->execute([
                $peliculaId,
                $comprador,
                $cantidad,
                $total
            ]);

            $this->conexion
                ->commit();

        } catch (Exception $e) {

            if (
                $this->conexion
                    ->inTransaction()
            ) {

                $this->conexion
                    ->rollBack();
            }

            throw $e;
        }
    }
}