<?php
require_once __DIR__.'../../../config/configuracion.php';
class ConexionBD{
public static function conectar():?PDO{
    global $datos;
    $conexion=new PDO(
        "mysql:host=".$datos['host'].";
        dbname=".$datos['db'].";
        charset=utf8mb4",
        $datos['user'],
        $datos['password']
    );
    $conexion->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );
    return $conexion;
}
}

?>