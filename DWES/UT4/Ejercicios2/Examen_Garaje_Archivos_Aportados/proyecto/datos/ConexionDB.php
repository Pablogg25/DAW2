<?php

require_once __DIR__ . '/../config/configuracion.php';

class ConexionDB
{
    public static function conectar(): ?PDO
    {
        $dns = 'mysql:host=localhost;dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
        return new PDO($dns, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
}
