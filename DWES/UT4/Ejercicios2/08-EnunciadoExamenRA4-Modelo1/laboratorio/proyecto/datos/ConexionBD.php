<?php
require_once __DIR__.'/../config/configuracion.php';

class ConexionBD{
    public static function getConexion():?PDO{
        global $bd;
        try{
            $conexion=new PDO(
            "mysql:host=".$bd['host'].";
            dbname=".$bd['bd'].";
            charset=utf8mb4",
            $bd['usuario'],
            $bd['password']
            );
            $conexion->setAttribute(
                PDO::ATTR_ERRMODE,
                PDO::ERRMODE_EXCEPTION
            );
            return $conexion;
        }catch(Exception $e){
            echo $e->getMessage();
            return null;
        }
        
    }
}

?>