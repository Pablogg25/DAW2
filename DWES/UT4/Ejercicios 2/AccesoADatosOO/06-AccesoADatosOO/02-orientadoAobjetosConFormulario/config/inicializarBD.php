<?php

$conexion = new PDO(
      "sqlite:" . __DIR__ . "/../productos.db"
);

$sql = file_get_contents(
    __DIR__ . "/config.sql"
);

$conexion->exec($sql);

echo "Base de datos creada";