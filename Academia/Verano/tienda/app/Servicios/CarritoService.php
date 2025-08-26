<?php
namespace App\Servicios;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Interfaces\ICarrito;
use App\Repositorios\CarritoRepo;
use App\Modelos\Carrito;

class CarritoService implements ICarrito
{

    private CarritoRepo $carritoRepo;

    public function __construct()
    {
        $this->carritoRepo = new CarritoRepo();
    }

    public function listarTodos(): ?array
    {
        return $this->carritoRepo->listarTodos();
    }
    public function porId(int $id): ?Carrito
    {
        return $this->carritoRepo->porId($id);
    }
    public function inserta(Carrito $c): ?Carrito
    {
        return $this->carritoRepo->inserta($c);
    }
    public function modifica(int $id, Carrito $c): ?Carrito
    {
        return $this->carritoRepo->modifica($id, $c);
    }
    public function elimina(Carrito $p): ?Carrito
    {
        return $this->carritoRepo->elimina($p);
    }
}

?>