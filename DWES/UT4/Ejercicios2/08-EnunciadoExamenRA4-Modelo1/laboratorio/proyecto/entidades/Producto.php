<?php
declare(strict_types=1);

class Producto{
    public function __construct(
        private int $id,
        private string $nombre,
        private float $precio
    ){}

    public function getId():int{
        return $this->id;
    }

    public function setId(int $id):void{
        $this->id=$id;
    }

    public function getNombre():string{
        return $this->nombre;
    }

    public function setNombre(string $n):void{
        $this->nombre=$n;
    }

    public function getPrecio():float{
        return $this->precio;
    }

    public function setPrecio(float $p):void{
        $this->precio=$p;
    }
}
?>