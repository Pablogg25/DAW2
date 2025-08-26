<?php
namespace App\Servicios;
require_once __DIR__ . '/../../vendor/autoload.php';
use PDO;
use App\Modelos\Usuario;
use App\Util\Conexion;
class UsuarioServicio
{
    private ?PDO $conexion = null;

    public function __construct()
    {
        $this->conexion = Conexion::getConexion();
    }

    public function inserta(Usuario $u): ?Usuario
    {
        $passCifrada = password_hash($u->getPass(), PASSWORD_BCRYPT);
        $usuario = $u->getUsuario();
        $sql = "insert into usuarios (usuario,pass)values (?,?);";
        $consulta = $this->conexion->prepare($sql);
        $consulta->execute([$usuario, $passCifrada]);
        $idUsuario = $this->conexion->lastInsertId();
        $u->setId($idUsuario);
        return $u;
    }

    public function existe(Usuario $u): bool
    {
        $usuario = $u->getUsuario();
        $sql = "select id from usuarios where usuario=?;";
        $consulta = $this->conexion->prepare($sql);
        $consulta->execute([$usuario]);
        return $consulta->fetch() != false;
    }

    public function porId(int $id): ?Usuario
    {
        $usuario = null;
        $sql = "select usuario,pass from usuarios where id=?";
        $consulta = $this->conexion->prepare($sql);
        $consulta->execute([$id]);
        if ($c = $consulta->fetch()) {
            $usuario = $c["usuario"];
            $pass = $c["pass"];
            $usuario = new Usuario($id, $usuario, $pass);
        }
        return $usuario;
    }

    public function dameId($u): int
    {
        $id = -1;
        $sql = "select id from usuarios where usuario=?;";
        $consulta = $this->conexion->prepare($sql);
        $nombreUsuario = $u->getUsuario();
        $consulta->execute([$nombreUsuario]);
        if ($c = $consulta->fetch()) {
            $id = $c["id"];
        }
        return $id;
    }
}

?>