<?php
declare(strict_types=1);

/*
  Ejercicio: conversor de monedas en una única página PHP.
  Archivo: código completo con comentarios inline para entender cada línea.
*/

/* ----------------------------
   Definición de monedas y tasas
   ---------------------------- */

/* Array asociativo con los códigos de moneda y su etiqueta legible */
$monedas = [
    'EUR' => 'Euro',
    'USD' => 'Dólar (USD)',
    'GBP' => 'Libra (GBP)',
];

/* Tasas relativas a 1 EUR. 
   - La clave es el código de la moneda.
   - El valor indica cuántas unidades de esa moneda equivalen a 1 EUR.
   Ejemplo: 'USD' => 1.10 significa 1 EUR = 1.10 USD. */
$tasas = [
    'EUR' => 1.00,
    'USD' => 1.10,
    'GBP' => 0.85,
];

/* ----------------------------
   Inicialización de variables
   ---------------------------- */

/* Array para acumular mensajes de error durante la validación */
$errores = [];        

/* Variable que contendrá el resultado de la conversión si todo es válido */
$resultado = null;    

/* ----------------------------
   Lectura de entrada (POST)
   ---------------------------- */

/* Recuperamos valores enviados por POST, si no existen usamos valores por defecto.
   - cantidad: lo que escribe el usuario (string inicialmente).
   - origen: moneda origen, por defecto 'EUR'.
   - destino: moneda destino, por defecto 'USD'. */
$cantidad = $_POST['cantidad'] ?? '';
$origen   = $_POST['origen']   ?? 'EUR';
$destino  = $_POST['destino']  ?? 'USD';

/* ----------------------------
   Procesamiento del formulario
   ---------------------------- */

/* Solo procesamos si la petición es POST (es decir, si se ha enviado el formulario) */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    /* Normalizamos separador decimal: permitimos coma o punto.
       - str_replace convierte comas en puntos.
       - (string)$cantidad asegura que trabajamos con string aunque venga null. */
    $cantidadRaw = str_replace(',', '.', (string)$cantidad);

    /* Validación básica de la cantidad:
       - Si está vacío o no es numérico, añadimos un error.
       - is_numeric permite reconocer números como "123", "12.3", "-5" (aquí negamos <=0 después).
    */
    if ($cantidad === '' || !is_numeric($cantidadRaw)) {
        $errores[] = 'Introduce una cantidad numérica válida.';
    } else {
        /* Convertimos a float una vez validado y comprobamos que sea mayor que cero. */
        $cantidad = (float)$cantidadRaw;
        if ($cantidad <= 0) {
            $errores[] = 'La cantidad debe ser mayor que cero.';
        }
    }

    /* Si no hay errores procedemos a convertir */
    if (empty($errores)) {
        /* Conversión en dos pasos: origen -> EUR -> destino
           - Primero llevamos la cantidad a euros dividiendo por la tasa de la moneda origen.
             Ejemplo: si origen=USD y tasa USD=1.10, 11 USD / 1.10 = 10 EUR.
           - Después multiplicamos los euros por la tasa de la moneda destino.
             Ejemplo: 10 EUR * 0.85 (GBP) = 8.5 GBP.
        */
        $enEuros   = $cantidad / $tasas[$origen];
        $convertido = $enEuros * $tasas[$destino];

        /* Guardamos datos en $resultado para mostrarlos en la parte HTML */
        $resultado = [
            'cantidad'  => $cantidad,
            'origen'    => $origen,
            'destino'   => $destino,
            'convertido'=> $convertido,
        ];
    }
}

/* ----------------------------
   Funciones auxiliares
   ---------------------------- */

/* h: escape rápido para imprimir en HTML y prevenir XSS
   - htmlspecialchars convierte caracteres especiales a entidades HTML.
   - ENT_QUOTES escapa comillas simples y dobles.
   - 'UTF-8' asegura la codificación.
*/
function h($s) { 
    return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); 
}

/* fmt: formatea números con 2 decimales y separadores europeos "," para decimales y "." para los miles
   - number_format((float)$n, 2, ',', '.') => "1.234,56"
*/

function fmt($n) { 
    return number_format((float)$n, 2, ',', '.'); 
}
?>

<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Ejercicio1 - Conversor de monedas</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
        /* Estilos mínimos para presentación */
        body{font-family: Arial, sans-serif; padding:20px; max-width:700px}
        label{display:block; margin-top:10px}
        input[type="text"]{width:200px; padding:6px}
        select{padding:6px}
        .error{color:#a00}
        .resultado{margin-top:20px; padding:12px; background:#f4f4f4; border:1px solid #ddd}
    </style>
</head>
<body>
    <h1>Conversor de monedas (única página)</h1>

    <!-- Si hay errores los mostramos en una lista -->
    <?php if ($errores): ?>
        <div class="error" role="alert">
            <ul>
                <?php foreach ($errores as $e): ?>
                    <li><?= h($e) /* Escape del mensaje de error */ ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <!-- Formulario que se envía a esta misma página -->
    <form method="post" action="<?= h($_SERVER['PHP_SELF']) ?>">
        <label>
            Cantidad:
            <!--
                - name="cantidad" para leerlo en $_POST.
                - value mantiene lo introducido por el usuario tras el envío.
                - inputmode="decimal" sugiere teclado numérico en móviles.
            -->
            <input type="text" name="cantidad" value="<?= h($cantidad) ?>" inputmode="decimal" />
            <small>Usa coma o punto como separador decimal.</small>
        </label>

        <!-- Select para elegir moneda origen -->
        <label>
            Origen:
            <select name="origen">
                <?php foreach ($monedas as $code => $label): ?>
                    <!--
                        - value es el código de moneda.
                        - comparamos $code con $origen y añadimos 'selected' si coinciden
                          para mantener la selección tras el envío.
                    -->
                    <option value="<?= h($code) ?>" <?= $code === $origen ? 'selected' : '' ?>>
                        <?= h($code . ' - ' . $label) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </label>

        <!-- Select para elegir moneda destino -->
        <label>
            Destino:
            <select name="destino">
                <?php foreach ($monedas as $code => $label): ?>
                    <option value="<?= h($code) ?>" <?= $code === $destino ? 'selected' : '' ?>>
                        <?= h($code . ' - ' . $label) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </label>

        <p><button type="submit">Convertir</button></p>
    </form>

    <!-- Si hay resultado lo mostramos formateado -->
    <?php if ($resultado): ?>
        <div class="resultado" aria-live="polite">
            <p><strong>Resultado:</strong></p>
            <p>
                <?= h(fmt($resultado['cantidad'])) ?> <?= h($resultado['origen']) ?>
                equivalen a <?= h(fmt($resultado['convertido'])) ?> <?= h($resultado['destino']) ?>
            </p>
            <!-- Mostramos nombre legible de las monedas a partir del array $monedas -->
            <p>Detalle: <?= h($monedas[$resultado['origen']]) ?> a <?= h($monedas[$resultado['destino']]) ?></p>
        </div>
    <?php endif; ?>

    <hr>
    <footer>
        <p>Ejercicio1 - Conversor de monedas en PHP</p>
    </footer>
</body>
</html>
