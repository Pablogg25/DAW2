<?php
namespace App\Repositorio;
require_once __DIR__ .'/../../vendor/autoload.php';
use App\Modelos\Jugador;
use App\Repositorio\IJugadorRepo;
use App\Util\Conexion;
use PDO;

class JugadorRepo implements IJugadorRepo {
    private $conexion = null;
    public function __construct() {
        $this->conexion = Conexion::getConexion();
    }
    public function listarTodo(): ?array {
        $lista = [];
        $sql = 'select codigo, nombre,procedencia, altura, peso, posicion, equipo from jugadores;';
        $resultado = $this->conexion->query($sql);
        $i = 0;
        while($r=$resultado->fetch()){
            $jugador = new Jugador (
                $r['codigo'],
                $r['nombre'],
                $r['procedencia'],
                $r['altura'],
                $r['peso'],
                $r['posicion'],
                $r['equipo']
            );
            $lista[$i] = $jugador;
            $i++;
        }
        return $lista;
    }

    public function porNombre(string $nombre): ?Jugador {
        $jugador = null;
        $sql = 'select codigo, nombre, procedencia, altura, peso, posicion, equipo from jugadores where nombre = ?;';
        $resultado = $this->conexion->prepare($sql);
        $resultado->bindParam(1, $nombre);
        $resultado->execute();
        while($r = $resultado->fetch()) {
            $jugador = new Jugador(
                $r['codigo'],
                $r['nombre'],
                $r['procedencia'],
                $r['altura'],
                $r['peso'],
                $r['posicion'],
                $r['equipo']
            );
        }
        return $jugador;
    }

    public function inserta(Jugador $jugador): bool {
        $exito = false;
        $sql = 'insert into jugadores (codigo, nombre, procedencia, altura, peso, posicion, equipo) values (?, ?, ?, ?, ?, ?, ?);';
        $consulta = $this->conexion->prepare($sql);
        $codigo = $jugador->getCodigo();
        $nombre = $jugador->getNombre();
        $procedencia = $jugador->getProcedencia();
        $altura = $jugador->getAltura();
        $peso = $jugador->getPeso();
        $posicion = $jugador->getPosicion();
        $equipo = $jugador->getEquipo();
        $consulta->bindParam(1, $codigo);
        $consulta->bindParam(2, $nombre);
        $consulta->bindParam(3, $procedencia);
        $consulta->bindParam(4, $altura);
        $consulta->bindParam(5, $peso);
        $consulta->bindParam(6, $posicion);
        $consulta->bindParam(7, $equipo);
        $resultado = $consulta->execute();
        if($resultado) {
            $exito = true;
        }
        return $exito;
    }

    public function modifica(string $nombre, Jugador $jugador): bool {
        $exito = false;
        $sql = 'update jugadores set codigo = ?, procedencia = ?, altura = ?, peso = ?, posicion = ?, equipo = ? where nombre = ?;';
        $consulta = $this->conexion->prepare($sql);
        $codigo = $jugador->getCodigo();
        $procedencia = $jugador->getProcedencia();
        $altura = $jugador->getAltura();
        $peso = $jugador->getPeso();
        $posicion = $jugador->getPosicion();
        $equipo = $jugador->getEquipo();
        $consulta->bindParam(1, $codigo);
        $consulta->bindParam(2, $procedencia);
        $consulta->bindParam(3, $altura);
        $consulta->bindParam(4, $peso);
        $consulta->bindParam(5, $posicion);
        $consulta->bindParam(6, $equipo);
        $consulta->bindParam(7, $nombre);
        $resultado = $consulta->execute();
        if($resultado) {
            $exito = true;
        }
        return $exito;
    }

    public function elimina(string $nombre): bool {
        $exito = false;
        $sql = 'delete from jugadores where nombre = ?;';
        $consulta = $this->conexion->prepare($sql);
        $consulta->bindParam(1, $nombre);
        $resultado = $consulta->execute();
        if($resultado) {
            $exito = true;
        }
        return $exito;
    }
    
}
?>