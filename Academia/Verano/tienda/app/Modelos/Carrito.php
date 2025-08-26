<?php
namespace App\Modelos;
require_once __DIR__ . '/../../vendor/autoload.php';
use DateTime;
use App\Modelos\Usuario;

class Carrito
{
    private int $id_carrito;
    private Usuario $usuario;
    private DateTime $fecha;

    public function __construct(int $id, Usuario $u, DateTime $f)
    {
        $this->id_carrito = $id;
        $this->usuario = $u;
        $this->fecha = $f;
    }

    public function getId(): int
    {
        return $this->id_carrito;
    }

    public function setId(int $id): void
    {
        $this->id_carrito = $id;
    }

    public function getUsuario(): Usuario
    {
        return $this->usuario;
    }

    public function setUsuario(Usuario $u): void
    {
        $this->usuario = $u;
    }

    public function getFecha(): ?DateTime
    {
        return $this->fecha;
    }

    public function setFecha(DateTime $f): void
    {
        $this->fecha = $f;
    }
}
?>