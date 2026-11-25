<?php

class ConexionBD
{
    public static function conectar(): PDO
    {
        require __DIR__ . "/../config/configuracion.php";
        if ($motorBaseDatos === "SQLITE") {
            $conexion = new PDO("sqlite:" . $ficheroSQLite);
        } else {
            $conexion = new PDO(
                "mysql:host="
                . $host
                . ";dbname="
                . $baseDatos
                . ";charset=utf8mb4",
                $usuario,
                $contrasena
            );
        }

        $conexion->setAttribute(
            PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION
        );

        return $conexion;
    }
}