<?php
require_once __DIR__ . '/../vendor/autoload.php';
use App\Servicios\UsuarioServicio;
use App\Modelos\Usuario;
use App\Util\Conexion;
$usuarioServ = new UsuarioServicio();

$usuarioNombre = isset($_POST["usuario"]) ? trim($_POST["usuario"]) : "";
$pass = isset($_POST["pass"]) ? trim($_POST["pass"]) : "";

if ($usuarioNombre != "" && $pass != "") {
    // Nuevo método para comprobar solo el nombre de usuario
    if (!method_exists($usuarioServ, 'existeUsuario')) {
        function existeUsuario($usuarioServ, $usuarioNombre)
        {
            $conexion = Conexion::getConexion();
            $sql = "select id from usuarios where usuario=?;";
            $consulta = $conexion->prepare($sql);
            $consulta->execute([$usuarioNombre]);
            return $consulta->fetch() != false;
        }
        $usuarioExiste = existeUsuario($usuarioServ, $usuarioNombre);
    } else {
        $usuarioExiste = $usuarioServ->existeUsuario($usuarioNombre);
    }

    if (!$usuarioExiste) {
        $usuarioObj = new Usuario(0, $usuarioNombre, $pass);
        $usuarioServ->inserta($usuarioObj);
    }
    header('Location:index.php');
    
}
?>