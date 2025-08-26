<?php
namespace App\Repositorios;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Interfaces\ICarrito;
use App\Modelos\Carrito;
use App\Servicios\UsuarioServicio;
use App\Util\Conexion;
use PDO;

class CarritoRepo implements ICarrito
{
    private UsuarioServicio $usuarioServ;
    private PDO $conexion;

    public function __construct()
    {
        $this->usuarioServ = new UsuarioServicio();
        $this->conexion = Conexion::getConexion();
    }

    public function listarTodos(): ?array
    {
        $lista = [];
        $sql = "select * from carrito order by fecha;";
        $consulta = $this->conexion->query($sql);
        while ($r = $consulta->fetch()) {
            $lista[] = new Carrito(
                $r["id_carrito"],
                $this->usuarioServ->porId($r["id_usuario"]),
                $r["fecha"] == null ? null : $r["fecha"]
            );
        }
        return $lista;
    }
    public function porId(int $id): ?Carrito
    {
        $carrito = null;
        $sql = "select * from carrito where id_carrito=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$id]);
        if ($resultado) {
            if ($r = $consulta->fetch()) {
                $carrito = new Carrito(
                    $id,
                    $this->usuarioServ->porId($r["id_usuario"]),
                    $r["fecha"] == null ? null : $r["fecha"]
                );
            }
        }
        return $carrito;
    }
    public function inserta(Carrito $c): ?Carrito
    {
        $carrito = null;
        $sql = "insert into carrito (id_usuario,fecha)values(?,?);";
        $consulta = $this->conexion->prepare($sql);
        $fecha = $c->getFecha();
        if ($fecha instanceof \DateTime) {
            $fecha = $fecha->format('Y-m-d H:i:s');
        }
        $resultado = $consulta->execute([$c->getUsuario()->getId(), $fecha]);
        if ($resultado) {
            $id = $this->conexion->lastInsertId();
            $carrito = $c;
            $carrito->setId($id);
        }
        return $carrito;
    }
    public function modifica(int $id, Carrito $c): ?Carrito
    {
        $carrito = null;
        $sql = "update carrito set id_usuario=?,fecha=? where id_carrito=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$c->getUsuario()->getId(), $c->getFecha(), $id]);
        if ($resultado) {
            $carrito = $c;
            $carrito->setId($id);
        }
        return $carrito;
    }
    public function elimina(Carrito $p): ?Carrito
    {
        $carrito = null;
        $sql = "delete from carrito where id_carrito=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$p->getId()]);
        if ($resultado) {
            $carrito = $p;
        }
        return $carrito;
    }
}

?>