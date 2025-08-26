<?php
namespace App\Modelos;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Modelos\Categoria;
class Producto
{
    private int $id_producto;
    private Categoria $categoria;
    private string $detalle;
    private float $precio;
    private int $stock;
    private string $foto;

    public function __construct(int $id, Categoria $cat, string $det, float $precio, int $stock, string $foto)
    {
        $this->id_producto = $id;
        $this->categoria = $cat;
        $this->detalle = $det;
        $this->precio = $precio;
        $this->stock = $stock;
        $this->foto = $foto;
    }

    public function getId(): int
    {
        return $this->id_producto;
    }

    public function setId(int $id): void
    {
        $this->id_producto = $id;
    }

    public function getCategoria(): Categoria
    {
        return $this->categoria;
    }

    public function setCategoria(Categoria $cat): void
    {
        $this->categoria = $cat;
    }

    public function getDetalle(): string
    {
        return $this->detalle;
    }

    public function setDetalle(string $det): void
    {
        $this->detalle = $det;
    }

    public function getPrecio(): float
    {
        return $this->precio;
    }

    public function setPrecio(float $p): void
    {
        $this->precio = $p;
    }

    public function getStock(): int
    {
        return $this->stock;
    }

    public function setStock(int $s): void
    {
        $this->stock = $s;
    }

    public function getFoto(): ?string
    {
        return $this->foto;
    }

    public function setFoto(string $f): void
    {
        $this->foto = $f;
    }
}
?>