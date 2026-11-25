<?php

require_once __DIR__ . "/../datos/conexionBD.php";
require __DIR__ . "/../config/configuracion.php";


if ($motorBaseDatos === "SQLITE") {
    // la metí dentro del if para diferenciar la conexión a SQLite de la conexión a MySQL
    // ya que en SQLite no se especifica la base de datos al conectarse
    $conexion = ConexionBD::conectar();  
    
    $rutaSql =  __DIR__ . "/../config/crearBD_sqlite.sql";
} else {
    // Conexión a MySQL, diferente a la conexión de la aplicación, ya que no se especifica la base de datos
    // Se hace así para poder crear la base de datos si no existe
    $conexion = new PDO(
        "mysql:host="
        . $host
        . ";charset=utf8mb4",
        $usuario,
        $contrasena
    );
    $rutaSql = __DIR__ . "/../config/crearBD_mysql.sql";
}

$sqlCreacion =
    file_get_contents($rutaSql);

$conexion->exec($sqlCreacion);

echo "Base de datos creada";