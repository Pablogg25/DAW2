<?php
declare(strict_types=1);

// 1. Iniciar la sesión ANTES de destruirla
/*session_start();
$_SESSION = [];
session_destroy(); */

// 2. Mostrar errores en pantalla
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// 3. Cargar todos los modelos PRIMERO (fundamental para que PHP reconozca los objetos)
require_once __DIR__ . '/src/Model/Cliente.php';
require_once __DIR__ . '/src/Model/Coche.php';
require_once __DIR__ . '/src/Model/Reparacion.php';
require_once __DIR__ . '/src/Model/Taller.php';

// 4. Cargar utilidades, servicio y controlador
require_once __DIR__ . '/src/Util/Helper.php';
require_once __DIR__ . '/src/Service/TallerService.php';
require_once __DIR__ . '/src/Controller/TallerController.php';

// 5. Arrancar la aplicación
$controller = new TallerController();
$controller->dispatch();