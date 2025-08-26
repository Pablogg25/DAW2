<?php
namespace App\Interfaces;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Modelos\Categoria;

interface ICategoria
{
    public function listarTodos(): ?array;
    public function porId(int $id): ?Categoria;
    public function inserta(Categoria $c): ?Categoria;
    public function modifica(int $id, Categoria $c): ?Categoria;
    public function elimina(Categoria $p): ?Categoria;
}

?>