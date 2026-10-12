<?php
declare(strict_types=1);

/* ==========================================================================
 * CONSTANTES
 * ========================================================================== */

/** Con este número de plazas libres (o menos) se considera "últimas plazas". */
const UMBRAL_ULTIMAS_PLAZAS = 3;

/* ==========================================================================
 * DATOS
 * ========================================================================== */

$actividades = [
    ["nombre" => "Robótica",      "plazas" => 20, "inscritos" => 18, "precio" => 25],
    ["nombre" => "Impresión 3D",  "plazas" => 15, "inscritos" => 15, "precio" => 30],
    ["nombre" => "Diseño Web",    "plazas" => 25, "inscritos" => 12, "precio" => 20],
    ["nombre" => "Videojuegos",   "plazas" => 18, "inscritos" => 17, "precio" => 35],
];

/* ==========================================================================
 * FUNCIONES: cálculos por actividad
 * ========================================================================== */

/** Plazas que quedan libres en una actividad. */
function calcularDisponibles(array $actividad): int
{
    return $actividad['plazas'] - $actividad['inscritos'];
}

/** Dinero recaudado por una actividad (inscritos x precio). */
function calcularRecaudacion(array $actividad): int
{
    return $actividad['inscritos'] * $actividad['precio'];
}

/** Porcentaje de ocupación redondeado a 2 decimales. */
function calcularOcupacion(int $inscritos, int $plazas): float
{
    if ($plazas === 0) {
        return 0.0;
    }
    return round(($inscritos * 100) / $plazas, 2);
}

/**
 * Devuelve el texto del estado y la clase CSS asociada
 * según las plazas disponibles.
 *
 * @return array{estado: string, clase: string}
 */
function obtenerEstado(int $disponibles): array
{
    if ($disponibles === 0) {
        return ['estado' => 'COMPLETA', 'clase' => 'completa'];
    } elseif ($disponibles <= UMBRAL_ULTIMAS_PLAZAS) {
        return ['estado' => 'ÚLTIMAS PLAZAS', 'clase' => 'ultimas'];
    } else {
        return ['estado' => 'DISPONIBLE', 'clase' => 'disponible'];
    }
}

/** Mensaje de aviso automático según las plazas disponibles. */
function generarAviso(string $nombre, int $disponibles): string
{
    if ($disponibles === 0) {
        return "La actividad {$nombre} ha cerrado inscripciones.";
    } elseif ($disponibles <= UMBRAL_ULTIMAS_PLAZAS) {
        return "La actividad {$nombre} está casi completa.";
    } else {
        return "La actividad {$nombre} tiene plazas suficientes.";
    }
}

/* ==========================================================================
 * FUNCIONES: estadísticas globales
 * ========================================================================== */

/** Suma el valor de una clave numérica en todas las actividades. */
function sumarCampo(array $actividades, string $campo): int
{
    $total = 0;
    foreach ($actividades as $actividad) {
        $total += $actividad[$campo];
    }
    return $total;
}

/** Recaudación total de todas las actividades. */
function calcularRecaudacionTotal(array $actividades): int
{
    $total = 0;
    foreach ($actividades as $actividad) {
        $total += calcularRecaudacion($actividad);
    }
    return $total;
}

/** Nombre de la actividad con más inscritos (si hay empate, la primera). */
function actividadConMasInscritos(array $actividades): string
{
    $nombre = '';
    $max = -1;
    foreach ($actividades as $actividad) {
        if ($actividad['inscritos'] > $max) {
            $max = $actividad['inscritos'];
            $nombre = $actividad['nombre'];
        }
    }
    return $nombre;
}

/** Nombre de la actividad con más plazas libres (si hay empate, la primera). */
function actividadConMasPlazasLibres(array $actividades): string
{
    $nombre = '';
    $max = -1;
    foreach ($actividades as $actividad) {
        $libres = calcularDisponibles($actividad);
        if ($libres > $max) {
            $max = $libres;
            $nombre = $actividad['nombre'];
        }
    }
    return $nombre;
}

/**
 * Agrupa todas las estadísticas globales en un único array.
 *
 * @return array<string, int|float|string>
 */
function calcularEstadisticas(array $actividades): array
{
    $totalPlazas = sumarCampo($actividades, 'plazas');
    $totalInscritos = sumarCampo($actividades, 'inscritos');

    return [
        'totalActividades'  => count($actividades),
        'totalPlazas'       => $totalPlazas,
        'totalInscritos'    => $totalInscritos,
        'ocupacionGlobal'   => calcularOcupacion($totalInscritos, $totalPlazas),
        'masDemandada'      => actividadConMasInscritos($actividades),
        'masLibre'          => actividadConMasPlazasLibres($actividades),
        'recaudacionTotal'  => calcularRecaudacionTotal($actividades),
    ];
}

/* ==========================================================================
 * FUNCIONES: preparación de datos para la vista
 * ========================================================================== */

/**
 * Construye las filas de la tabla con todos los datos ya calculados,
 * de modo que la vista solo tenga que imprimirlos.
 */
function prepararFilas(array $actividades): array
{
    $filas = [];
    foreach ($actividades as $actividad) {
        $disponibles = calcularDisponibles($actividad);

        $filas[] = [
            'nombre'      => $actividad['nombre'],
            'plazas'      => $actividad['plazas'],
            'inscritos'   => $actividad['inscritos'],
            'disponibles' => $disponibles,
            'estado'      => obtenerEstado($disponibles),
            'recaudacion' => calcularRecaudacion($actividad),
            'ocupacion'   => calcularOcupacion($actividad['inscritos'], $actividad['plazas']),
        ];
    }
    return $filas;
}

/** Genera la lista de avisos automáticos de todas las actividades. */
function prepararAvisos(array $actividades): array
{
    $avisos = [];
    foreach ($actividades as $actividad) {
        $avisos[] = generarAviso($actividad['nombre'], calcularDisponibles($actividad));
    }
    return $avisos;
}

/** Escapa un valor para imprimirlo de forma segura en HTML. */
function e(string|int|float $valor): string
{
    return htmlspecialchars((string) $valor, ENT_QUOTES, 'UTF-8');
}

/* ==========================================================================
 * LÓGICA: todos los cálculos se hacen aquí, antes del HTML
 * ========================================================================== */

$filas = prepararFilas($actividades);
$estadisticas = calcularEstadisticas($actividades);
$avisos = prepararAvisos($actividades);


