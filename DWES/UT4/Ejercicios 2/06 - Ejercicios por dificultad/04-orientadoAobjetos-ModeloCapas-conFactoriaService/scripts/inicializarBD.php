<?php

require_once __DIR__ . "/../datos/ConexionBD.php";

$conexion = conectarBD();

$sql = file_get_contents(
    __DIR__ . "/../config/config.sql"
);

$conexion->exec($sql);

echo "Base de datos creada";