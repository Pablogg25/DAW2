<?php
namespace App\Servicios;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Interfaces\IUsuario;
use App\Repositorios\UsuarioRepo;
use App\Modelos\Usuario;

class UsuarioServicio implements IUsuario
{
    private UsuarioRepo $usuarioRepo;

    public function __construct()
    {
        $this->usuarioRepo = new UsuarioRepo();
    }
    public function listarTodos(): ?array
    {
        return $this->usuarioRepo->listarTodos();
    }
    public function porId(int $id): ?Usuario
    {
        return $this->usuarioRepo->porId($id);
    }
    public function inserta(Usuario $c): ?Usuario
    {
        return $this->usuarioRepo->inserta($c);
    }
    public function modifica(int $id, Usuario $c): ?Usuario
    {
        return $this->usuarioRepo->modifica($id, $c);
    }
    public function elimina(Usuario $p): ?Usuario
    {
        return $this->usuarioRepo->elimina($p);
    }

    public function porNombre(string $nombre): ?Usuario
    {
        return $this->usuarioRepo->porNombre($nombre);
    }
}
?>