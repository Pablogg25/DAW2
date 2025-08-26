<?php
namespace App\Repositorio;
require_once __DIR__ .'/../../vendor/autoload.php';
use App\Modelos\Jugador;

interface IJugadorRepo {
    public function listarTodo(): ?array;
    public function porNombre(string $nombre): ?Jugador;
    public function inserta(Jugador $jugador): bool;
    public function modifica(string $nombre, Jugador $jugador): bool;
    public function elimina(string $nombre): bool;
}
?>