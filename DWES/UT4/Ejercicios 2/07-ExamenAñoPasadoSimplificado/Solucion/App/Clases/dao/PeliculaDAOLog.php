<?php

require_once __DIR__
    . "/PeliculaDAO.php";

class PeliculaDAOLog
    implements PeliculaDAO
{
    private PeliculaDAO $dao;

    public function __construct(
        PeliculaDAO $dao
    ) {
        $this->dao = $dao;
    }

    private function escribirLog(
        string $mensaje
    ): void {

        file_put_contents(
            __DIR__
            . "/../../../log.txt",

            date("Y-m-d H:i:s")
            . " - "
            . $mensaje
            . PHP_EOL,

            FILE_APPEND
        );
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

    public function insertar(
        Pelicula $pelicula
    ): void {

        $this->escribirLog(
            "ALTA PELICULA: "
            . $pelicula->titulo
        );

        $this->dao->insertar(
            $pelicula
        );
    }

    public function actualizar(
        Pelicula $pelicula
    ): void {

        $this->escribirLog(
            "MODIFICACION PELICULA ID="
            . $pelicula->id
        );

        $this->dao->actualizar(
            $pelicula
        );
    }

    public function borrar(
        int $id
    ): void {

        $this->escribirLog(
            "BORRADO PELICULA ID="
            . $id
        );

        $this->dao->borrar(
            $id
        );
    }

    public function venderEntradas(
        int $peliculaId,
        string $comprador,
        int $cantidad
    ): void {

        $this->escribirLog(
            "VENTA "
            . $cantidad
            . " ENTRADAS PELICULA ID="
            . $peliculaId
            . " COMPRADOR="
            . $comprador
        );

        $this->dao
            ->venderEntradas(
                $peliculaId,
                $comprador,
                $cantidad
            );
    }
}