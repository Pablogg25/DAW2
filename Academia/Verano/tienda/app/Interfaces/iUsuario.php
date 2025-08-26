<?php
namespace App\Interfaces;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Modelos\Usuario;

interface IUsuario
{
    public function listarTodos(): ?array;
    public function porId(int $id): ?Usuario;
    public function inserta(Usuario $c): ?Usuario;
    public function modifica(int $id, Usuario $c): ?Usuario;
    public function elimina(Usuario $p): ?Usuario;
}

?>