<?php
declare(strict_types=1);

class Conexion{

    public static function getConexion():?PDO{
        try{
            $conexion=new PDO(
                'mysql:host=localhost;dbname=tienda;charset=utf8mb4',
                'root',
                'mysql',
                [
                    PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION
                ]
            );
            echo 'Conexión realizada con éxito.';
        }catch(PDOException $e){
            $conexion=null;
            echo 'No se ha podido conectar con la base de datos;';
        }
        return $conexion;
    }

}


?>