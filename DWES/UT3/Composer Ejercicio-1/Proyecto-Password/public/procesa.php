<?php
require __DIR__ . '/../vendor/autoload.php';

use App\Clases\AdaptadorGeneradorPassword;

session_start();

$opciones = [
    'mayusculas' => isset($_POST['mayusculas']),
    'minusculas' => isset($_POST['minusculas']),
    'numeros'    => isset($_POST['numeros']),
    'simbolos'   => isset($_POST['simbolos']),
    'longitud'   => (int)($_POST['longitud'] ?? 8),
];

$generador = new AdaptadorGeneradorPassword();
$password = $generador->generar($opciones);

$_SESSION['passwords'][] = $password;

echo "<h1>Contraseña generada:</h1>";
echo "<p><strong>$password</strong></p>";
echo "<a href='index.php'>Volver al formulario</a>";
