<?php
declare(strict_types=1);

class Producto{
    public function __construct(
        private int $id,
        private string $nombre,
        private float $precio,
        private int $cantidad
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

    public function setNombre(string $nombre):void{
        $this->nombre=$nombre;
    }

    public function getPrecio():float{
        return $this->precio;
    }

    public function setPrecio(float $precio):void{
        $this->precio=$precio;
    }

    public function getCantidad():int{
        return $this->cantidad;
    }

    public function setCantidad(int $cantidad):void{
        $this->cantidad=$cantidad;
    }
}

?>