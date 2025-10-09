<?php

class Producto
{
    private int $codigo;
    private  String $nombre;
    private float $PVP;

    public function __construct($nombre, $PVP, $codigo)
    {
        $this->codigo = $codigo;
        $this->nombre = $nombre;
        $this->PVP = $PVP;
    }
    public function muestra()
    {
        return "<p>" . $this->codigo . "</p>";
    }

    public function mostrarDatos()
    {
        echo "El producto con codigo " . $this->codigo . " con nombre " . $this->nombre . " tiene " . $this->PVP . " PVP";
    }

    public function setCodigo($codigo)
    {
        $this->codigo = $codigo;
    }
    public function getCodigo()
    {
        return $this->codigo;
    }
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }
    public function getNombre()
    {
        return $this->nombre;
    }
    public function setPVP($PVP)
    {
        $this->PVP = $PVP;
    }
    public function getPVP()
    {
        return $this->PVP;
    }
}
