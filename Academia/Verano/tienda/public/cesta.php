<?php
session_start();
require_once __DIR__ . '/../vendor/autoload.php';
use App\Servicios\CarritoService;
use App\Servicios\UsuarioServicio;
use App\Modelos\Carrito;
if (isset($_GET["m"]))
    $m = $_GET["m"];
else
    $m = '';

if ($m != '') {
    switch ($m) {
        case "agrega":
            if (isset($_SESSION["ID_CARRITO"])) {

            } else {
                // Creo un carrito y lo asigno a la variable de sesión ID_CARRITO
                $usuarioServ = new UsuarioServicio();
                if (isset($_SESSION["ID_USUARIO"])) {
                    $usuario = $usuarioServ->porId($_SESSION["ID_USUARIO"]);
                    $fecha = new DateTime("now");
                    $carritoServ = new CarritoService();
                    $carrito = $carritoServ->inserta(new Carrito(
                        0,
                        $usuario,
                        $fecha
                    ));
                } else {
                    header('Location:index.php');
                }
            }
            break;
    }
}

?>