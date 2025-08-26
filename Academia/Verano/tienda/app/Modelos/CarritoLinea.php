<?php
namespace App\Modelos;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Modelos\Carrito;
use App\Modelos\Producto;

class CarritoLinea
{
    private int $id_carrito_linea;
    private Carrito $carrito;
    private Producto $producto;
    private int $cantidad;

    public function __construct(int $id, Carrito $c, Producto $p, int $uds)
    {
        $this->id_carrito_linea = $id;
        $this->carrito = $c;
        $this->producto = $p;
        $this->cantidad = $uds;
    }

    public function getId(): int
    {
        return $this->id_carrito_linea;
    }

    public function setId(int $id): void
    {
        $this->id_carrito_linea = $id;
    }

    public function getCarrito(): Carrito
    {
        return $this->carrito;
    }

    public function setCarrito(Carrito $c): void
    {
        $this->carrito = $c;
    }

    public function getProducto(): Producto
    {
        return $this->producto;
    }

    public function setProducto(Producto $p): void
    {
        $this->producto = $p;
    }

    public function getCantidad(): int
    {
        return $this->cantidad;
    }

    public function setCantidad(int $uds): void
    {
        $this->cantidad = $uds;
    }
}
?>