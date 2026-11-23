<?php
declare(strict_types=1);

require_once 'src/Util/Conexion.php';
require_once 'src/Modelos/Producto.php';

class ProductoService{

    private ?PDO $conexion;

    public function __construct(){
        $this->conexion=Conexion::getConexion();
    }
/*
    public function listAll():?array{
        $listado=[];
        $sql="select * from productos;";
        $resultado=$this->conexion->query($sql);
        while($fila=$resultado->fetch()){
            $listado[]=new Producto(
                (int)$fila["id"],
                $fila["nombre"],
                (float)$fila["precio"],
                (int)$fila["unidades"]
            );
        }
        return $listado;
    }
*/
    public function listAll():?array{
        $listado=[];
        $sql="select * from productos;";
        $resultado=$this->conexion->query($sql);
        $resultados=$resultado->fetchAll();
        foreach($resultados as $r){
            $listado[]=new Producto(
                (int)$r[0],
                $r["nombre"],
                (float)$r["precio"],
                (int)$r["unidades"]
            );
        }
        return $listado;
    }

    public function save(Producto $producto):?Producto{
        $nuevo=null;
        try{
            $sql="insert into productos(nombre,precio,unidades)values(
                '".$producto->getNombre()."',".$producto->getPrecio().",".$producto->getCantidad()."
            );";
            $resultado=$this->conexion->exec($sql);
            if($resultado===1){
                $nuevo=new Producto(
                (int)$this->conexion->lastInsertId(),
                $producto->getNombre(),
                (float)$producto->getPrecio(),
                (int)$producto->getCantidad()
            );
            }
            
        }catch(PDOException $e){
            echo 'No se ha podido guardar el producto.<br/>'.$e->getMessage();
        }
        return $nuevo;
    }

    public function update(int $id,Producto $producto):?Producto{
        $nuevo=null;
        try{
            $sql="update productos set nombre='".$producto->getNombre()."', precio=".$producto->getPrecio().",
            unidades=".$producto->getCantidad()." where id=".$id.";";
            $resultado=$this->conexion->exec($sql);
            if($resultado===1){
                $nuevo=new Producto(
                (int)$this->conexion->lastInsertId(),
                $producto->getNombre(),
                (float)$producto->getPrecio(),
                (int)$producto->getCantidad()
            );
            }
        }catch(PDOException $e){
            echo 'No se ha podido actualizar el producto.<br/>Error: '.$e->getMessage();
        }
        return $nuevo;
    }

    
}

?>