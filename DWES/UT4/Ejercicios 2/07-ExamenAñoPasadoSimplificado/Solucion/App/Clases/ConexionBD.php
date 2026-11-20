<?php

class ConexionBD
{
    public static function conectar(): PDO
    {
        $conexion = new PDO(
            "mysql:host=localhost;
             dbname=dwes_examen2_ut04;
             charset=utf8mb4",
            "root",
            "root"
        );

        $conexion->setAttribute(
            PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION
        );

        return $conexion;
    }
}