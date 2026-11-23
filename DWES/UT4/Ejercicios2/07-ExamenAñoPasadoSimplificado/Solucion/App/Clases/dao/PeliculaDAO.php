<?php

require_once __DIR__
    . "/../entidades/Pelicula.php";

interface PeliculaDAO
{
    public function obtenerTodas(): array;

    public function obtenerPorId(
        int $id
    ): ?Pelicula;

    public function insertar(
        Pelicula $pelicula
    ): void;

    public function actualizar(
        Pelicula $pelicula
    ): void;

    public function borrar(
        int $id
    ): void;

    public function venderEntradas(
        int $peliculaId,
        string $comprador,
        int $cantidad
    ): void;
}