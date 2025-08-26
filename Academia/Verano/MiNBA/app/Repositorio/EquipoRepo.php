<?php
namespace App\Repositorio;
require_once __DIR__ .'/../../vendor/autoload.php';
use App\Modelos\Equipo;
use App\Repositorio\IEquipoRepo;
use App\Util\Conexion;
use PDO;

class EquipoRepo implements IEquipoRepo{
    private $conexion = null;
    public function __construct() {
        $this->conexion = Conexion::getConexion();
    }

 public function listarTodo(): ?array{
    $lista = [];
    $sql = 'select nombre, ciudad, conferencia, division from equipos;';
    $resultado = $this->conexion->query($sql);
    $i=0;
    while($r=$resultado->fetch()) {
        $equipo = new Equipo(
            $r['nombre'],
            $r['ciudad'],
            $r['conferencia'],
            $r['division']
        );
        $lista[$i] = $equipo;
        $i++;
    }
    return $lista;
 }

    public function porNombre(string $nombre): ?Equipo{
        $equipo = null;
        $sql = 'select nombre, ciudad, conferencia, division from equipos where nombre = ?;';
        $resultado = $this->conexion->prepare($sql);
        $resultado->bindParam(1, $nombre);
        $resultado->execute();
        while($r = $resultado->fetch()) {
            $equipo = new Equipo(
                $r['nombre'],
                $r['ciudad'],
                $r['conferencia'],
                $r['division']
            );
        }   
        return $equipo;
    }

    public function inserta(Equipo $equipo): bool{
        $exito = false;
        $sql = 'insert into equipos (nombre, ciudad, conferencia, division) values (?, ?, ?, ?);';
        $consulta = $this->conexion->prepare($sql);
        $nombre = $equipo->getNombre();
        $ciudad = $equipo->getCiudad();
        $conferencia = $equipo->getConferencia();
        $division = $equipo->getDivision();
        $consulta->bindParam(1, $nombre);
        $consulta->bindParam(2, $ciudad);
        $consulta->bindParam(3, $conferencia);
        $consulta->bindParam(4, $division);
        $resultado = $consulta->execute();
        if($resultado) {
            $exito = true;
        }
        return $exito;
    }
    public function modifica(string $nombre, Equipo $equipo): bool{
        $exito = false;
        $sql = 'update equipos set ciudad = ?, conferencia = ?, estadio = ? where nombre = ?;';
        $consulta = $this->conexion->prepare($sql);
        $ciudad = $equipo->getCiudad();
        $conferencia = $equipo->getConferencia();   
        $division = $equipo->getDivision();
        $consulta->bindParam(1, $ciudad);
        $consulta->bindParam(2, $conferencia);
        $consulta->bindParam(3, $division);
        $consulta->bindParam(4, $nombre);
        $resultado = $consulta->execute();
        if($resultado) {
            $exito = true;
        }
        return $exito;

    }
    public function elimina(string $nombre): bool{
        $exito = false;
        $sql = 'delete from equipos where nombre = ?;';
        $consulta = $this->conexion->prepare($sql);
        $consulta->bindParam(1,$nombre);
        $resultado = $consulta->execute();
        if($resultado) {
            $exito = true;
        }
        return $exito;
    }
}
?>