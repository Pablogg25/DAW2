<?php

class Pelicula
{
    public int $id;

    public string $titulo;

    public float $precio;

    public int $entradasDisponibles;

    public function __construct(
        int $id,
        string $titulo,
        float $precio,
        int $entradasDisponibles
    ) {
        $this->id = $id;

        $this->titulo = $titulo;

        $this->precio = $precio;

        $this->entradasDisponibles =
            $entradasDisponibles;
    }
}