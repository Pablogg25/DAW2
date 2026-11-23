<?php

require_once "conexionBD.php";

$conexion = conectarBD();

$sql = file_get_contents(
    __DIR__ . "/config.sql"
);

$conexion->exec($sql);

echo "Base de datos creada";