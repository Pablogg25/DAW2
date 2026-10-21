<?php

declare(strict_types=1);

/**
 * Censura palabras prohibidas en un texto.
 * 
 * @param string $texto Texto original
 * @param string ...$prohibidas Lista variable de palabras a censurar
 * @return array [texto_censurado, total_censuras_acumuladas]
 */
function censurarTexto(string $texto, string ...$prohibidas): array
{
    // Variable estática: su valor persiste entre diferentes llamadas a la función
    static $palabrasCensuradas = 0;

    // 1. Convertimos el texto en un array de palabras separadas por espacios
    $palabras = explode(" ", $texto);

    // 2. Iteramos por referencia (&) para poder modificar las palabras directamente
    foreach ($palabras as &$palabra) {
        // Quitamos posibles puntos y comas para la comparación lógica
        $palabraLimpia = trim($palabra, ".,;:!?");

        // Condición de parada: si encontramos "potente", detenemos el análisis inmediatamente
        if (strtolower($palabraLimpia) === "potente") {
            break;
        }

        // Si la palabra está en la lista de prohibidas
        if (in_array($palabraLimpia, $prohibidas)) {
            // Reemplazamos la palabra manteniendo los posibles signos de puntuación (ej: "practica," -> "***,")
            $palabra = str_replace($palabraLimpia, "***", $palabra);
            $palabrasCensuradas++;
        }
    }
    unset($palabra); // Rompemos la referencia

    // 3. Reconstruimos el texto con implode
    $textoCensurado = implode(" ", $palabras);

    // 4. Devolvemos un array con el texto y el contador acumulado
    return [$textoCensurado, $palabrasCensuradas];
}

// ==========================================
// PRUEBAS Y DESESTRUCTURACIÓN
// ==========================================

$texto = "PHP es genial. Aprender PHP requiere practica, pero es muy potente.";

// Primera llamada: censuramos "PHP" y "practica" pasadas como argumentos sueltos (variádicos)
[$textoFinal1, $totalCensuras1] = censurarTexto($texto, "PHP", "practica");

echo "<h3>Primera llamada:</h3>";
echo "<p><strong>Texto resultado:</strong> $textoFinal1</p>";
echo "<p><strong>Palabras censuradas acumuladas:</strong> $totalCensuras1</p>";

// Segunda llamada con otro texto para comprobar la variable 'static':
$texto2 = "Me gusta programar en PHP y Java.";
[$textoFinal2, $totalCensuras2] = censurarTexto($texto2, "PHP", "Java");

echo "<h3>Segunda llamada (demostración de variable static):</h3>";
echo "<p><strong>Texto resultado:</strong> $textoFinal2</p>";
echo "<p><strong>Total censuras acumuladas en la sesión:</strong> $totalCensuras2</p>";
