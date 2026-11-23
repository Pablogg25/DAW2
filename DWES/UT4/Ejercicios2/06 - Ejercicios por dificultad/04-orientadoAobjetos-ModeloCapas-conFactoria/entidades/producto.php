<?php

class Producto
{
    public int $id;
    public string $nombre;
    public float $precio;

    public function __construct(
        int $id,
        string $nombre,
        float $precio
    ) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->precio = $precio;
    }
}