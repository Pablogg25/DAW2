<?php
namespace App\Repositorios;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Interfaces\IUsuario;
use App\Modelos\Usuario;
use App\Util\Conexion;
use PDO;


class UsuarioRepo implements IUsuario
{
    private PDO $conexion;

    public function __construct()
    {
        $this->conexion = Conexion::getConexion();
    }
    public function listarTodos(): ?array
    {
        $lista = [];
        $sql = "select * from usuarios;";
        $consulta = $this->conexion->query($sql);
        while ($r = $consulta->fetch()) {
            $lista[] = new Usuario(
                $r["id_usuario"],
                $r["usuario"],
                $r["pass"]
            );
        }
        return $lista;
    }
    public function porId(int $id): ?Usuario
    {
        $usuario = null;
        $sql = "select * from usuarios where id_usuario=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$id]);
        if ($resultado) {
            if ($r = $consulta->fetch()) {
                $usuario = new Usuario(
                    $r["id_usuario"],
                    $r["usuario"],
                    $r["pass"]
                );
            }
        }
        return $usuario;
    }
    public function inserta(Usuario $c): ?Usuario
    {
        $usuario = null;
        $passCifrada = password_hash($c->getPass(), PASSWORD_BCRYPT);
        $sql = "insert into usuarios (usuario,pass)values(?,?);";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$c->getUsuario(), $passCifrada]);
        if ($resultado) {
            $id = $this->conexion->lastInsertId();
            $usuario = $c;
            $usuario->setId($id);
        }
        return $usuario;
    }
    public function modifica(int $id, Usuario $c): ?Usuario
    {
        $usuario = null;
        $passCifrada = password_hash($c->getPass(), PASSWORD_BCRYPT);
        $sql = "update usuarios set usuario=?, pass=? where id_usuario=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$c->getUsuario(), $passCifrada, $id]);
        if ($resultado) {
            $usuario = $this->porId($id);
        }
        return $usuario;
    }
    public function elimina(Usuario $p): ?Usuario
    {
        $usuario = null;
        $sql = "delete from usuarios where id_usuario=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$p->getId()]);
        if ($resultado) {
            $usuario = $p;
        }
        return $usuario;
    }

    public function porNombre(string $nombre): ?Usuario
    {
        $usuario = null;
        $sql = "select * from usuarios where usuario=?;";
        $consulta = $this->conexion->prepare($sql);
        $resultado = $consulta->execute([$nombre]);
        if ($resultado) {
            if ($r = $consulta->fetch()) {
                $usuario = new Usuario(
                    $r["id_usuario"],
                    $nombre,
                    $r["pass"]
                );
            }
        }
        return $usuario;
    }
}
?>