<?php
namespace App\Repositorio;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Modelos\Libro;//Tampoco lo habías escrito: ¿Cómo quieres que tire de la clase libro.... INTELIGENTE?

interface ILibroRepo
{
    public function listarTodos(): ?array;
    public function porId(string $cod_libro): ?Libro;
    public function inserta(Libro $libro): bool;
    public function modifica(string $cod_libro, Libro $libro): bool;
    public function elimina(string $id): bool;
}
?>