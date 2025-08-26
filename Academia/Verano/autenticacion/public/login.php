<?php
session_start();
require_once __DIR__ . '/../vendor/autoload.php';
use App\Servicios\UsuarioServicio;
use App\Modelos\Usuario;

if (isset($_POST["usuario"]))
    $usuario = $_POST["usuario"];
else
    $usuario = "";
if (isset($_POST["pass"]))
    $pass = $_POST["pass"];
else
    $pass = "";
$user = new Usuario(0, $usuario, $pass);
$usuarioServ = new UsuarioServicio();
//$usuarioServ->inserta($user);
//header('Location:index.php');
if ($usuarioServ->existe($user)) {
    $id_usuario = $usuarioServ->dameId($user);
    $pass = trim($user->getPass());
    $user = $usuarioServ->porId($id_usuario);
    $passCifrada = trim($user->getPass());    
    if (password_verify($pass, $passCifrada)) {
        $_SESSION["id_usuario"] = $user->getId();
    } else {
        $_SESSION["id_usuario"] = -1;
    }
} else {
    $_SESSION["id_usuario"] = -1;
}
header('Location:inicio.php');
?>