<?php

declare(strict_types=1);

$viajes = [
    'paris'   => ['nombre' => 'París Romántico', 'plazas_totales' => 20, 'plazas_reservadas' => 18, 'precio' => 150.0],
    'londres' => ['nombre' => 'Londres Clásico', 'plazas_totales' => 15, 'plazas_reservadas' => 15, 'precio' => 120.0],
    'roma'    => ['nombre' => 'Roma Antigua',    'plazas_totales' => 30, 'plazas_reservadas' => 10, 'precio' => 95.5]
];

function calcularDisponibles(array $viaje)
{
    return $viaje['plazas_totales'] - $viaje['plazas_reservadas'];
};

function obtenerClaseEstado(int $disponibles): string
{
    return match (true) {
        $disponibles === 0 => 'agotado',
        $disponibles <= 3  => 'ultimas',
        default            => 'disponible',
    };
};

function e(string|int|float $valor): string
{
    return htmlspecialchars((string)$valor, ENT_QUOTES, 'UTF-8');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recogida y saneamiento básico
    $destino = filter_input(INPUT_POST, 'destino', FILTER_SANITIZE_SPECIAL_CHARS) ?? '';
    $email = trim($_POST['email'] ?? '');

    // Validación estricta con filter_var
    $billetes = filter_input(INPUT_POST, 'billetes', FILTER_VALIDATE_INT);
    $emailValido = filter_var($email, FILTER_VALIDATE_EMAIL);

    // Comprobaciones
    if (empty($destino) || !array_key_exists($destino, $viajes)) {
        $errores[] = "Debes seleccionar un destino válido.";
    }
    if ($billetes === false || $billetes <= 0) {
        $errores[] = "La cantidad de billetes debe ser un número entero mayor que 0.";
    }
    if ($emailValido === false) {
        $errores[] = "El correo electrónico introducido no es válido.";
    }

    // Lógica de negocio (si no hay errores de validación)
    if (empty($errores)) {
        $plazasLibres = calcularDisponibles($viajes[$destino]);

        if ($billetes > $plazasLibres) {
            $errores[] = "No hay suficientes plazas. Quedan {$plazasLibres} disponibles.";
        } else {
            // Actualizamos el array (simulando una base de datos)
            $viajes[$destino]['plazas_reservadas'] += $billetes;
            $mensajeExito = "¡Reserva confirmada! Has comprado {$billetes} billete(s) para " . $viajes[$destino]['nombre'] . ".";
        }
    }
}
