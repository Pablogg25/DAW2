<?php
namespace App\Repositorio;
require_once __DIR__ .'/../../vendor/autoload.php';
use App\Modelos\Equipo;

interface IEquipoRepo {
    public function listarTodo(): ?array;
    public function porNombre(string $nombre): ?Equipo;
    public function inserta(Equipo $equipo): bool;
    public function modifica(string $nombre, Equipo $equipo): bool;
    public function elimina(string $nombre): bool;
}
?>