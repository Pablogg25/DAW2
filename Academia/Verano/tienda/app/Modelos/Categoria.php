<?php
namespace App\Modelos;
require_once __DIR__ . '/../../vendor/autoload.php';

class Categoria
{
    private int $id_categoria;
    private string $detalle;

    public function __construct(int $id, string $cat)
    {
        $this->id_categoria = $id;
        $this->detalle = $cat;
    }

    public function getId(): int
    {
        return $this->id_categoria;
    }

    public function setId(int $id): void
    {
        $this->id_categoria = $id;
    }

    public function getDetalle(): string
    {
        return $this->detalle;
    }

    public function setDetalle(string $det): void
    {
        $this->detalle = $det;
    }
}