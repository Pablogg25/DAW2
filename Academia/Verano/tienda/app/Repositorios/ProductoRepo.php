<?php
namespace App\Repositorios;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Interfaces\IProducto;
use App\Modelos\Producto;
use App\Modelos\Categoria;
use App\Repositorios\CategoriaRepo;
use PDO;
use App\Util\Conexion;

class ProductoRepo implements IProducto
{
    private PDO $conexion;
    private CategoriaRepo $categoriaRepo;

    public function __construct()
    {
        $this->conexion = Conexion::getConexion();
        $this->categoriaRepo = new CategoriaRepo();
    }

    public function listarTodos(): ?array
    {
        $lista = [];
        $sql = "select * from productos;";
        $consulta = $this->conexion->query($sql);
        while ($r = $consulta->fetch()) {
            $lista[] = new Producto(
                $r["id_producto"],
                $this->categoriaRepo->porId($r["id_categoria"]),
                $r["detalle"],
                $r["precio"],
                $r["stock"],
                $r["foto"]
            );
        }
        return $lista;
    }

    public function porCategoria(Categoria $c): ?array
    {
        $lista = [];
        $sql = "select * from productos where id_categoria=?;";
        $consulta = $this->conexion->prepare($sql);
        $consulta->execute([$c->getId()]);
        while ($r = $consulta->fetch()) {
            $lista[] = new Producto(
                $r["id_producto"],
                $this->categoriaRepo->porId($r["id_categoria"]),
                $r["detalle"],
                $r["precio"],
                $r["stock"],
                $r["foto"]
            );
        }
        return $lista;
    }

    public function porId(int $id): ?Producto
    {
        $producto = null;
        $sql = "select * from productos where id_producto=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$id]);
        if ($consulta->execute([$id]) != false) {
            $r = $consulta->fetch();
            $producto = new Producto(
                $r["id_producto"],
                $this->categoriaRepo->porId($r["id_categoria"]),
                $r["detalle"],
                $r["precio"],
                $r["stock"],
                $r["foto"]
            );
        }

        return $producto;
    }

    public function inserta(Producto $p): ?Producto
    {
        $producto = null;
        $sql = "insert into productos(id_categoria,detalle,precio,stock,foto) values(?,?,?,?,?);";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([
            $p->getCategoria()->getId(),
            $p->getDetalle(),
            $p->getPrecio(),
            $p->getStock(),
            $p->getFoto()
        ]);
        if ($resultado) {
            $id = $this->conexion->lastInsertId();
            $producto = $p;
            $producto->setId($id);
        }
        return $producto;
    }

    public function modifica(int $id, Producto $p): ?Producto
    {
        $producto = null;
        $sql = "update productos set id_categoria=?, detalle=?,precio=?,stock=?, foto=? where id_producto=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([
            $p->getCategoria()->getId(),
            $p->getDetalle(),
            $p->getPrecio(),
            $p->getStock(),
            $p->getFoto(),
            $id
        ]);
        if ($resultado) {
            $producto = $p;
            $producto->setId($id);
        }
        return $producto;
    }

    public function elimina(Producto $p): ?Producto
    {
        $producto = null;
        $sql = "delete from productos where id_producto=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$p->getId()]);
        if ($resultado) {
            $producto = $p;
        }
        return $producto;
    }

    public function aleatorios(int $cantidad): array
    {
        $lista = [];
        $todos = $this->listarTodos();
        $ids = [];
        foreach ($todos as $uno) {
            $ids[] = $uno->getId();
        }
        $mayor = max($ids);
        $menor = min($ids);
        $sacados = [];
        $total = 0;
        while ($total < $cantidad) {
            $num = rand($menor, $mayor);
            $p = $this->porId($num);
            if ($p != null && !in_array($num, $sacados)) {
                $lista[] = $p;
                $sacados[] = $num;
                $total++;
            }
        }

        return $lista;
    }
}
?>