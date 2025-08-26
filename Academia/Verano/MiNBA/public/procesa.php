<?php
require_once __DIR__ . '/../vendor/autoload.php';
use App\Repositorio\EquipoRepo;
use App\Modelos\Equipo;
if (isset($_GET["modo"]))
    $modo = $_GET["modo"];
else
    $modo = "";

switch($modo){
    case "modifica":
        if(isset($_GET["nombre"]))
                $nombre = $_GET["nombre"];
        else
                $nombre = "";
            if($nombre != ""){
                $equipoRepo = new EquipoRepo();
                $ciudad = $_POST["ciudad"];
                $conferencia = $_POST["conferencia"];
                $division = $_POST["division"];
                $equipo = new Equipo($nombre, $ciudad, $conferencia, $division);
                $resultado = $equipoRepo->modifica($nombre,$equipo);
                if($resultado){
                    header("Location: index.php?mensaje=Equipo modificado correctamente");
                } else {
                    header("Location: index.php?mensaje=Error al modificar el equipo");
                }
            }
            break;
    case "elimina":
        $nombre = $_GET["nombre"];
        $equipoRepo = new EquipoRepo();
        if($equipoRepo->elimina($nombre)){
            header("Location: index.php?mensaje=Equipo eliminado correctamente");
        } else {
            header("Location: index.php?mensaje=Error al eliminar el equipo");
        }

}
?>