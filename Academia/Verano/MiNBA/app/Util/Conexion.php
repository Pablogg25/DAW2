<?php
namespace App\Util;
require_once __DIR__ . '/../../vendor/autoload.php';
use PDO;

$dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

class Conexion{
    private static ?PDO $conexion = null;
    public static function getConexion(): ?PDO{
        if(!self::$conexion){
            self::$conexion = new PDO(
                dsn: $_ENV["DB_DSN"],
                username: $_ENV["DB_USERNAME"],
                password: $_ENV["DB_PASSWORD"],
            );
        }
        return self::$conexion;
    }
}
?>