<?php
namespace App\Modelos;
require_once __DIR__ .'/../../vendor/autoload.php';
class Jugador {
    private int $codigo;
    private string $nombre;
    private string $procedencia;
    private string $altura;
    private int $peso;
    private string $posicion;
    private string $equipo;

    public function __construct(int $codigo, string $nombre, string $procedencia, string $altura, int $peso, string $posicion, string $equipo) {
        $this->codigo = $codigo;
        $this->nombre = $nombre;
        $this->procedencia = $procedencia;
        $this->altura = $altura;
        $this->peso = $peso;
        $this->posicion = $posicion;
        $this->equipo = $equipo;
    }
    public function getCodigo(): int {
        return $this->codigo;   
    }
    public function getNombre(): string {
        return $this->nombre;   
    }
    public function getProcedencia(): string {
        return $this->procedencia;   
    }
    public function getAltura(): string {
        return $this->altura;   
    }
    public function getPeso(): int {
        return $this->peso;   
    }
    public function getPosicion(): string {
        return $this->posicion;   
    }
    public function getEquipo(): string {
        return $this->equipo;   
    }
    public function setCodigo(int $codigo): void {
        $this->codigo = $codigo;
    }
    public function setNombre(string $nombre): void {
        $this->nombre = $nombre;
    }
    public function setProcedencia(string $procedencia): void {
        $this->procedencia = $procedencia;
    }
    public function setAltura(string $altura): void {
        $this->altura = $altura;
    }
    public function setPeso(int $peso): void {
        $this->peso = $peso;
    }
    public function setPosicion(string $posicion): void {
        $this->posicion = $posicion;
    }
    public function setEquipo(string $equipo): void {
        $this->equipo = $equipo;
    }
    
}
?>