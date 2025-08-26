<?php
namespace App\Servicios;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Interfaces\ICategoria;
use App\Repositorios\CategoriaRepo;
use App\Modelos\Categoria;

class CategoriaServicio implements ICategoria
{
    private CategoriaRepo $categoriaRepo;

    public function __construct()
    {
        $this->categoriaRepo = new CategoriaRepo();
    }
    public function listarTodos(): ?array
    {

        return $this->categoriaRepo->listarTodos();
    }
    public function porId(int $id): ?Categoria
    {
        return $this->categoriaRepo->porId($id);
    }

    public function inserta(Categoria $c): ?Categoria
    {
        return $this->categoriaRepo->inserta($c);
    }
    public function modifica(int $id, Categoria $c): ?Categoria
    {
        return $this->categoriaRepo->modifica($id, $c);
    }
    public function elimina(Categoria $p): ?Categoria
    {
        return $this->categoriaRepo->elimina($p);
    }
}
?>