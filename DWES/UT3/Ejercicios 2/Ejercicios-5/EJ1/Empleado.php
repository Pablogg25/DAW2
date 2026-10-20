<?php

class Empleado
{
    protected string $nombre;
    protected float $sueldo;

    function __construct($sueldo, $nombre)
    {
        $this->sueldo = $sueldo;
        $this->nombre = $nombre;
    }

    function getSueldo(): float
    {
        return $this->sueldo;
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }
}
