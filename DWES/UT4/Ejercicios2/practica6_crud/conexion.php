<?php
require_once __DIR__ . '/configuracion.php';

try {
    $dsn = "mysql:host=$host;dbname=$baseDatos;charset=utf8mb4";
    $conexion = new PDO($dsn, $usuario, $contrasena, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    error_log($e->getMessage());
    die('No se ha podido conectar con la base de datos.');
}
