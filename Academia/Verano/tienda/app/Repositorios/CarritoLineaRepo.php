<?php
namespace App\Repositorios;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Interfaces\ICarritoLinea;
use App\Util\Conexion;
use App\Modelos\Carrito;
use App\Modelos\CarritoLinea;
use App\Servicios\CarritoService;
use App\Servicios\ProductoServicio;
use PDO;


class CarritoLineaRepo implements ICarritoLinea
{
    private PDO $conexion;
    private CarritoService $carritoServ;
    private ProductoServicio $productoServ;

    public function __construct()
    {
        $this->conexion = Conexion::getConexion();
        $this->carritoServ = new CarritoService();
        $this->productoServ = new ProductoServicio();
    }
    public function listarCarrito(Carrito $c): ?array
    {
        $lista = [];
        $sql = "select * from carrito_lineas where id_carrito=?;";
        $consulta = $this->conexion->prepare($sql);
        $consulta->execute([$c->getId()]);
        while ($r = $consulta->fetch()) {
            $lista[] = new CarritoLinea(
                $r["id_carrito_linea"],
                $this->carritoServ->porId($r["id_carrito"]),
                $this->productoServ->porId($r["id_producto"]),
                $r["cantidad"]
            );
        }
        return $lista;
    }
    public function porId(int $id): ?CarritoLinea
    {
        $carritoLinea = null;
        $sql = "select * from carrito_lineas where id_carrito_linea=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$id]);
        if ($resultado) {
            if ($r = $consulta->fetch()) {
                $carritoLinea = new CarritoLinea(
                    $id,
                    $this->carritoServ->porId($r["id_carrito"]),
                    $this->productoServ->porId($r["id_producto"]),
                    $r["cantidad"]
                );
            }
        }
        return $carritoLinea;
    }
    public function inserta(CarritoLinea $c): ?CarritoLinea
    {
        $carritoLinea = null;
        $sql = "insert into carrito_lineas (id_carrito,id_producto,cantidad)values(?,?,?);";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$c->getCarrito()->getId(), $c->getProducto()->getId(), $c->getCantidad()]);
        if ($resultado) {
            $id = $this->conexion->lastInsertId();
            $carritoLinea = $c;
            $c->setId($id);
        }
        return $carritoLinea;
    }
    public function modifica(int $id, CarritoLinea $c): ?CarritoLinea
    {
        $carritoLinea = null;
        $sql = "update carrito_lineas set id_carrito=?, id_producto=?, cantidad=? where id_carrito_linea=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([
            $c->getCarrito()->getId(),
            $c->getProducto()->getId(),
            $c->getCantidad(),
            $id
        ]);
        if ($resultado) {
            $carritoLinea = $c;
            $c->setId($id);
        }
        return $carritoLinea;
    }
    public function elimina(CarritoLinea $p): ?CarritoLinea
    {
        $carritoLinea = null;
        $sql = "delete from carrito_lineas where id_carrito_linea=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$p->getId()]);
        if ($resultado) {
            $carritoLinea = $p;
        }
        return $carritoLinea;
    }
}
?>