<?php

declare(strict_types=1);
class Moto
{
    public int $id;
    public string $modelo;
    public float $precio;

    public function __construct(int $id, string $modelo, float $precio)
    {
        $this->id = $id;
        $this->modelo = $modelo;
        $this->precio = $precio;
    }
}
