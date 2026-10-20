<?php

// 1. Array multidimensional con alumnos, nombre y array de 3 notas
$alumnos = [
    [
        'nombre' => 'Pablo',
        'notas'  => [3, 4, 10]
    ],
    [
        'nombre' => 'Lucia',
        'notas'  => [4, 8, 6]
    ],
    [
        'nombre' => 'Javi',
        'notas'  => [10, 9, 9]
    ],
    [
        'nombre' => 'Eduardo',
        'notas'  => [7, 8, 3]
    ]
];

// 2. Función para calcular la media
function calcularMedia(array $notas): float
{
    if (empty($notas)) {
        return 0.0;
    }
    return array_sum($notas) / count($notas);
}

// 3. Foreach por referencia (&) para modificar el array original
foreach ($alumnos as &$alumno) {
    // Calculamos y guardamos la media (redondeada a 2 decimales si se desea)
    $alumno['media'] = round(calcularMedia($alumno['notas']), 2);

    // Asignamos la calificación usando match (true) para rangos
    $alumno['calificacion'] = match (true) {
        $alumno['media'] < 5 => 'Suspenso',
        $alumno['media'] < 7 => 'Bien',
        $alumno['media'] < 9 => 'Notable',
        default              => 'Sobresaliente',
    };
}
unset($alumno); // Buena práctica: rompe la referencia con el último elemento

// 4. (Opcional) Función bonus: recibe el array completo por referencia
function aplicarBonus(array &$listaAlumnos): void
{
    foreach ($listaAlumnos as &$al) {
        if ($al['media'] < 5) {
            $al['media'] += 0.5;
            // Si supera o iguala el 5 con el bonus, actualizamos calificación
            if ($al['media'] >= 5) {
                $al['calificacion'] = 'Bien';
            }
        }
    }
    unset($al);
}

// Ejemplo de llamada al bonus
aplicarBonus($alumnos);

// 5. Visualizar los resultados
echo "<h2>Listado de Alumnos</h2>";
foreach ($alumnos as $alumno) {
    echo "<p><strong>{$alumno['nombre']}</strong> - Media: {$alumno['media']} - Calificación: {$alumno['calificacion']}</p>";
}