<?php
declare(strict_types=1);

class Producto{
    public function __construct(
        private string $nombre,
        private float $precio,
        private int $cantidad
    ){}

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

    public function toString():string{
        return "Nombre producto: ".$this->nombre." - Precio: ".$this->precio." € - Cantidad: ".
        $this->cantidad." - Total inventario: ".$this->getTotalProducto()." €";
    }

    public function getTotalProducto():float{
        return $this->precio*$this->cantidad;
    }
}

?>