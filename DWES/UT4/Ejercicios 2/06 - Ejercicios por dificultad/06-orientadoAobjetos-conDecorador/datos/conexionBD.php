<?php

class ConexionBD
{
    public static function conectar(): PDO
    {
        $conexion = new PDO(
            "sqlite:" . __DIR__ . "/../productos.db"
        );

        $conexion->setAttribute(
            PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION
        );

        return $conexion;
    }
}