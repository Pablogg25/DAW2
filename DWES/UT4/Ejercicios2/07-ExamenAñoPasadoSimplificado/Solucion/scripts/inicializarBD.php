<?php

$conexion = new PDO(
    "mysql:host=localhost;charset=utf8mb4",
    "root",
    "root"
);

$sqlCreacion =
    file_get_contents(
        __DIR__ . "/../sql/crearBD.sql"
    );

$sqlDatos =
    file_get_contents(
        __DIR__ . "/../sql/pobladoDatos.sql"
    );

$conexion->exec($sqlCreacion);
$conexion->exec($sqlDatos);

echo "Base de datos creada";