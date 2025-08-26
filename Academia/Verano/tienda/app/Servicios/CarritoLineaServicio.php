<?php
namespace App\Servicios;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Repositorios\CarritoLineaRepo;
use App\Interfaces\ICarritoLinea;
use App\Modelos\Carrito;
use App\Modelos\CarritoLinea;

class CarritoLineaServicio implements ICarritoLinea
{
    private CarritoLineaRepo $carritoLineaRepo;

    public function __construct()
    {
        $this->carritoLineaRepo = new CarritoLineaRepo();
    }

    public function listarCarrito(Carrito $c): ?array
    {
        return $this->carritoLineaRepo->listarCarrito($c);
    }
    public function porId(int $id): ?CarritoLinea
    {
        return $this->carritoLineaRepo->porId($id);
    }
    public function inserta(CarritoLinea $c): ?CarritoLinea
    {
        return $this->carritoLineaRepo->inserta($c);
    }
    public function modifica(int $id, CarritoLinea $c): ?CarritoLinea
    {
        return $this->carritoLineaRepo->modifica($id, $c);
    }
    public function elimina(CarritoLinea $p): ?CarritoLinea
    {
        return $this->carritoLineaRepo->elimina($p);
    }
}
?>