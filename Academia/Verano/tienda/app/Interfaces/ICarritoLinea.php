<?php
namespace App\Interfaces;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Modelos\Carrito;
use App\Modelos\CarritoLinea;

interface ICarritoLinea
{
    public function listarCarrito(Carrito $c): ?array;
    public function porId(int $id): ?CarritoLinea;
    public function inserta(CarritoLinea $c): ?CarritoLinea;
    public function modifica(int $id, CarritoLinea $c): ?CarritoLinea;
    public function elimina(CarritoLinea $p): ?CarritoLinea;
}
?>