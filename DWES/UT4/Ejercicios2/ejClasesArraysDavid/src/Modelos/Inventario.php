<?php
declare(strict_types=1);
require_once('src/Modelos/Producto.php');
require_once('src/Util/Helper.php');

class Inventario{
    private array $productos=[];

    public function addProducto(Producto $producto):void{
        $this->productos[]=$producto;
    }

    public function listarProductos():void{
        echo '<h2>Listado de todos los productos</h2>';
        echo '<ul>';
        foreach($this->productos as $p){
            echo '<li>'.$p->toString().'</li>';
        }
        echo '</ul>';
    }

    public function porNombre(string $nombre):?Producto{
        foreach($this->productos as $p){
            //if(Helper::limpiaTexto($p->getNombre())===Helper::limpiaTexto($nombre))return $p;
            if(str_contains(Helper::limpiaTexto($p->getNombre()),Helper::limpiaTexto($nombre)))return $p;
        }
        return null;
    }

    public function getValorTotal():float{
        $total=0.00;
        foreach($this->productos as $p){
            $total+=$p->getTotalProducto();
        }
        return $total;
    }
}

?>