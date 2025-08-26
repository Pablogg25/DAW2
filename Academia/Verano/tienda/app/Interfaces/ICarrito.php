<?php
namespace App\Interfaces;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Modelos\Carrito;
use App\Modelos\CarritoLinea;

interface ICarrito
{
    public function listarTodos(): ?array;
    public function porId(int $id): ?Carrito;
    public function inserta(Carrito $c): ?Carrito;
    public function modifica(int $id, Carrito $c): ?Carrito;
    public function elimina(Carrito $p): ?Carrito;
}
?>