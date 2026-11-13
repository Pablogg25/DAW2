<?php

function escapar(string|int|float $valor): string
{
    return htmlspecialchars((string) $valor, ENT_QUOTES, 'UTF-8');
}

function validarFormularioProducto(array $datosPost): array
{
    $errores = [];

    $nombre = trim($datosPost['nombre'] ?? '');
    $precioRaw = str_replace(',', '.', trim($datosPost['precio'] ?? ''));
    $unidadesRaw = trim($datosPost['unidades'] ?? '');

    $precio = filter_var($precioRaw, FILTER_VALIDATE_FLOAT);
    $unidades = filter_var($unidadesRaw, FILTER_VALIDATE_INT);

    if ($nombre === '') {
        $errores[] = 'El nombre del producto es obligatorio.';
    }
    if ($precio === false || $precio < 0) {
        $errores[] = 'El precio debe ser un número decimal válido mayor o igual a 0.';
    }
    if ($unidades === false || $unidades < 0) {
        $errores[] = 'Las unidades deben ser un número entero mayor o igual a 0.';
    }

    return [
        'errores' => $errores,
        'datos' => [
            'nombre' => $nombre,
            'precio' => (float) $precio,
            'unidades' => (int) $unidades
        ]
    ];
}
