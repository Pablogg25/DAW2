<?php
namespace App\Interfaces;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Modelos\Producto;
use App\Modelos\Categoria;

interface IProducto
{
    public function listarTodos(): ?array;
    public function porCategoria(Categoria $c): ?array;
    public function porId(int $id): ?Producto;
    public function inserta(Producto $p): ?Producto;
    public function modifica(int $id, Producto $p): ?Producto;
    public function elimina(Producto $p): ?Producto;
}

?>