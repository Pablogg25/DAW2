<?php
require_once __DIR__.'/ProductoDAO.php';
require_once __DIR__.'/../entidades/Producto.php';

class ProductoPDODAO implements ProductoDAO{
    private PDO $conexion;

    public function __construct(PDO $conexion){
        $this->conexion=$conexion;
    }

    public function listAll():?array{
        $sql="select * from productos;";
        try{
            $consulta=$this->conexion->prepare($sql);
            $ok=$consulta->execute();
            if($ok){
                $listado=[];
                $filas=$consulta->fetchAll(PDO::FETCH_ASSOC);
                foreach($filas as $f){
                    $listado[]=new Producto(
                        (int)$f['id'],
                        $f['nombre'],
                        (float)$f['precio']
                    );
                }
                return $listado;
            }else{
                return null;
            }
        }catch(Exception $e){
            echo '<a href="index.php">Atras</a>';
            echo $e->getMessage();
            return null;
        }
    }

    public function byId(int $id):?Producto{
        $sql="select * from productos where id=?;";
        try{
            $consulta=$this->conexion->prepare($sql);
            $ok=$consulta->execute([$id]);
            if($ok){
                $fila=$consulta->fetch(PDO::FETCH_ASSOC);
                if($fila){
                    return new Producto(
                        (int)$fila['id'],
                        $fila['nombre'],
                        (float)$fila['precio']
                    );
                }
            }else{
                return null;
            }
        }catch(Exception $e){
            echo '<a href="index.php">Atras</a>';
            echo $e->getMessage();
            return null;
        }
    }
    public function save(Producto $producto):?Producto{
        $sql="insert into productos (nombre, precio)values (?,?);";
        try{
            $consulta=$this->conexion->prepare($sql);
            $ok=$consulta->execute([
                $producto->getNombre(),
                $producto->getPrecio()
            ]);
            if($ok){
                $nuevaId=$this->conexion->lastInsertId();
                $producto->setId($nuevaId);
                return $producto;
            }else{
                return null;
            }
        }catch(Exception $e){
            echo '<a href="index.php">Atras</a>';
            echo $e->getMessage();
            return null;
        }
    }
    public function update(int $id, Producto $producto):?Producto{
        $sql="update productos set nombre=?, precio=? where id=?;";
        try{
            $consulta=$this->conexion->prepare($sql);
            $ok=$consulta->execute([
                $producto->getNombre(),
                $producto->getPrecio(),
                $id
            ]);
            if($ok){
                $producto->setId($id);
                return $producto;
            }else{
                return null;
            }
        }catch(Exception $e){
            echo '<a href="index.php">Atras</a>';
            echo $e->getMessage();
            return null;
        }
    }
    public function delete(int $id):?Producto{
        $sql="delete from productos where id=?;";
        $backup=$this->byId($id);
        try{
            $consulta=$this->conexion->prepare($sql);
            $ok=$consulta->execute([$id]);
            if($ok){
                return $backup;
            }else{
                return null;
            }
        }catch(Exception $e){
            echo '<a href="index.php">Atras</a>';
            echo $e->getMessage();
            return null;
        }
    }
    public function reemplazarProducto(
        string $nombreProducto,
        string $nombreNuevoProducto, 
        float $precioNuevoProducto):?Producto{
            $listado=[];
            $listado=$this->listAll();
            $producto=null;
            $nombreProducto=mb_strtolower(trim($nombreProducto),'UTF-8');
            $nombreNuevoProducto=mb_strtolower(trim($nombreNuevoProducto),'UTF-8');
            foreach($listado as $l){
                if($nombreProducto===mb_strtolower(($l->getNombre()),'UTF-8')){
                    $producto=$l;
                }
            }
            if($producto===null)return null;
            $producto->setNombre($nombreNuevoProducto);
            $producto->setPrecio($precioNuevoProducto);
            $modificado=$this->update($producto->getId(),$producto);
            if($modificado===null)return null;
            else{
                return $modificado;
            }
        }
}

?>