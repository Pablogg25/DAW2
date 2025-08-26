<?php
namespace App\Repositorios;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Interfaces\ICategoria;
use App\Modelos\Categoria;
use PDO;
use App\Util\Conexion;

class CategoriaRepo implements ICategoria
{
    private PDO $conexion;

    public function __construct()
    {
        $this->conexion = Conexion::getConexion();
    }

    public function listarTodos(): ?array
    {
        $lista = [];
        $sql = "select * from categorias order by detalle;";
        $consulta = $this->conexion->query($sql);
        while ($r = $consulta->fetch()) {
            $lista[] = new Categoria(
                $r["id_categoria"],
                $r["detalle"]
            );
        }
        return $lista;
    }


    public function porId(int $id): ?Categoria
    {
        $cat = null;
        $sql = "select * from categorias where id_categoria=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$id]);
        if ($resultado) {
            if ($r = $consulta->fetch()) {
                $cat = new Categoria($r["id_categoria"], $r["detalle"]);
            }
        }
        return $cat;
    }

    public function inserta(Categoria $p): ?Categoria
    {
        $cat = null;
        $sql = "insert into categorias (detalle) values(?);";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$p->getDetalle()]);
        $id = $this->conexion->lastInsertId();
        if ($resultado)
            $cat = new Categoria($id, $p->getDetalle());
        return $cat;
    }

    public function modifica(int $id, Categoria $p): ?Categoria
    {
        $cat = null;
        $sql = "update categorias set detalle=? where id_categoria=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$p->getDetalle(), $id]);
        if ($resultado) {
            $cat = $this->porId($id);
        }
        return $cat;
    }

    public function elimina(Categoria $p): ?Categoria
    {
        $cat = null;
        $sql = "delete from categorias where id_categoria=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$p->getId()]);
        if ($resultado) {
            $cat = $p;
        }
        return $cat;
    }
}
?>