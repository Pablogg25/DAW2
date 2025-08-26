<?php
namespace App\Modelos;
require_once __DIR__ .'/../../vendor/autoload.php';

class Equipo {
    private string $nombre;
    private string $ciudad;
    private string $conferencia;
    private string $division;

    public function __construct(string $nombre, string $ciudad, string $conferencia, string $division) {
        $this->nombre = $nombre;
        $this->ciudad = $ciudad;
        $this->conferencia = $conferencia;
        $this->division = $division;
    }
    
     public function getNombre(): string {
        return $this->nombre;   
     }
    public function getCiudad(): string {
        return $this->ciudad;   
     }
    public function getConferencia(): string {
        return $this->conferencia;   
     }
    public function getDivision(): string {
        return $this->division;   
     }
    public function setNombre(string $nombre): void {
        $this->nombre = $nombre;
    }
    public function setCiudad(string $ciudad): void {
        $this->ciudad = $ciudad;
    }
    public function setConferencia(string $conferencia): void {
        $this->conferencia = $conferencia;
    }
    public function setDivision(string $division): void {
        $this->division = $division;
    }
    
}
?>