<?php

/* Configuración de la aplicación */

/** escoger el tipo de DAO a utilizar: "MEMORIA" o "PDO" */

// $tipoDAO = "MEMORIA";

$tipoDAO = 'PDO';

/** escoger el motor de base de datos a utilizar: "SQLITE" o "MYSQL" (solo si $tipoDAO === "PDO") */

/*
 * Para usar SQLite, asegúrate de que la extensión PDO_SQLITE esté habilitada en tu archivo php.ini.
 * Para usar MySQL, asegúrate de que la extensión PDO_MYSQL esté habilitada en tu archivo php.ini.
 */

$motorBaseDatos = 'SQLITE';

$motorBaseDatos = 'MYSQL';

$host = 'localhost';
$baseDatos = 'laboratorio';
$usuario = 'root';
$contrasena = 'r00tMy$ql';

$ficheroSQLite =
    __DIR__ . '/laboratorio.db';
