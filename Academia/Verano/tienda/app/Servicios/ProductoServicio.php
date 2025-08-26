<?php
namespace App\Servicios;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Interfaces\IProducto;
use App\Modelos\Categoria;
use App\Modelos\Producto;
use App\Repositorios\ProductoRepo;

class ProductoServicio implements IProducto
{
    private ProductoRepo $productoRepo;

    public function __construct()
    {
        $this->productoRepo = new ProductoRepo();
    }

    public function listarTodos(): ?array
    {
        return $this->productoRepo->listarTodos();
    }
    public function porCategoria(Categoria $c): ?array
    {
        return $this->productoRepo->porCategoria($c);
    }
    public function porId(int $id): ?Producto
    {
        return $this->productoRepo->porId($id);
    }
    public function inserta(Producto $p): ?Producto
    {
        return $this->productoRepo->inserta($p);
    }
    public function modifica(int $id, Producto $p): ?Producto
    {
        return $this->productoRepo->modifica($id, $p);
    }
    public function elimina(Producto $p): ?Producto
    {
        return $this->productoRepo->elimina($p);
    }

    public function aleatorios(int $cantidad): array
    {
        return $this->productoRepo->aleatorios($cantidad);
    }

}
?>