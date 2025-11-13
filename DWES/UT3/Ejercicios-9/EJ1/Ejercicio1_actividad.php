<?php
declare(strict_types=1);

/*
  Ejercicio: conversor de monedas en una única página PHP.
  Estructura simple:
   - Definimos las monedas y sus tasas relativas a 1 EUR.
   - Procesamos el formulario POST (validación mínima).
   - Convertimos: origen -> EUR -> destino.
   - Mostramos resultado y mantenemos valores en el formulario.
*/


$monedas = [
    'EUR' => 'Euro',
    'USD' => 'Dólar (USD)',
    'GBP' => 'Libra (GBP)',
];

$tasas = [
    'EUR' => 1.00,
    'USD' => 1.10, 
    'GBP' => 0.85, 
];


$errores = [];        
$resultado = null;    


$cantidad = $_POST['cantidad'] ?? '';
$origen   = $_POST['origen']   ?? 'EUR';
$destino  = $_POST['destino']  ?? 'USD';




if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    $cantidadRaw = str_replace(',', '.', (string)$cantidad);
    if ($cantidad === '' || !is_numeric($cantidadRaw)) {
        $errores[] = 'Introduce una cantidad numérica válida.';
    } else {
        $cantidad = (float)$cantidadRaw;
        if ($cantidad <= 0) {
            $errores[] = 'La cantidad debe ser mayor que cero.';
        }
    }

    
    
    if (empty($errores)) {
      
        $enEuros   = $cantidad / $tasas[$origen];
        $convertido = $enEuros * $tasas[$destino];

        $resultado = [
            'cantidad'  => $cantidad,
            'origen'    => $origen,
            'destino'   => $destino,
            'convertido'=> $convertido,
        ];
    }
}


function h($s) { 
    return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); 
}

function fmt($n) { return number_format((float)$n, 2, ',', '.'); }
?>


<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Ejercicio1 - Conversor de monedas</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
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

    
    <?php if ($errores): ?>
        <div class="error" role="alert">
            <ul>
                <?php foreach ($errores as $e): ?>
                    <li><?= h($e) ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

  
    <form method="post" action="<?= h($_SERVER['PHP_SELF']) ?>">
        <label>
            Cantidad:
            <input type="text" name="cantidad" value="<?= h($cantidad) ?>" inputmode="decimal" />
            <small>Usa coma o punto como separador decimal.</small>
        </label>

        /*si el código coincide estrictamente con la variable $origen, 
        añade el atributo selected para que ese option aparezca seleccionado. 
        Esto permite mantener la selección después de enviar el formulario. */
        <label>
            Origen:
            <select name="origen">
                <?php foreach ($monedas as $code => $label): ?>
                    <option value="<?= h($code) ?>" <?= $code === $origen ? 'selected' : '' ?>>
                        <?= h($code . ' - ' . $label) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </label>

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

  
    <?php if ($resultado): ?>
        <div class="resultado" aria-live="polite">
            <p><strong>Resultado:</strong></p>
            <p>
                <?= h(fmt($resultado['cantidad'])) ?> <?= h($resultado['origen']) ?>
                equivalen a <?= h(fmt($resultado['convertido'])) ?> <?= h($resultado['destino']) ?>
            </p>
            <p>Detalle: <?= h($monedas[$resultado['origen']]) ?> a <?= h($monedas[$resultado['destino']]) ?></p>
        </div>
    <?php endif; ?>

    <hr>
    <footer>
        <p>Ejercicio1 - Conversor de monedas en PHP</p>
</body>
</html>