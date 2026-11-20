<?php

require_once __DIR__
    . "/../dao/PeliculaDAO.php";

class PeliculaService
{
    private PeliculaDAO $dao;

    public function __construct(
        PeliculaDAO $dao
    ) {
        $this->dao = $dao;
    }

    public function obtenerTodas(): array
    {
        return $this->dao
            ->obtenerTodas();
    }

    public function obtenerPorId(
        int $id
    ): ?Pelicula {

        return $this->dao
            ->obtenerPorId(
                $id
            );
    }

    public function crear(
        Pelicula $pelicula
    ): void {

        if (
            trim(
                $pelicula->titulo
            ) === ""
        ) {

            throw new Exception(
                "Título obligatorio"
            );
        }

        if (
            $pelicula->precio < 0
        ) {

            throw new Exception(
                "Precio incorrecto"
            );
        }

        $this->dao->insertar(
            $pelicula
        );
    }

    public function actualizar(
        Pelicula $pelicula
    ): void {

        $this->dao->actualizar(
            $pelicula
        );
    }

    public function borrar(
        int $id
    ): void {

        $this->dao->borrar(
            $id
        );
    }

    public function venderEntradas(
        int $peliculaId,
        string $comprador,
        int $cantidad
    ): void {

        $this->dao
            ->venderEntradas(
                $peliculaId,
                $comprador,
                $cantidad
            );
    }
}