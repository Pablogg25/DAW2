<?php
// ejercicio1.php
// Coloca este fichero en tu servidor PHP y ábrelo en el navegador.
// Usa método POST al enviar el formulario a sí mismo ($_SERVER['PHP_SELF']).

// Array de monedas y descripcion
$monedas = [
    'EUR' => 'Euros',
    'USD' => 'Dolares',
    'GBP' => 'Libras'
];

// Array monedas y tipo de cambio
$tipoCambio = [
    'EUR' => 1.00,
    'USD' => 0.97,
    'GBP' => 0.85
];

// Array de resultados
$resultados = [];

$cantidad =$_POST['cantidad']??'';
$origen = $_POST['origen']??'';
$destino = $_POST['destino']??'';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($monedas[$origen])) {
        $errores[] = 'Moneda de origen inválida.';
    }
    if (!isset($monedas[$destino])) {
        $errores[] = 'Moneda de destino inválida.';
    }
}
$cantidadNormalized = str_replace(',', '.', trim($cantidad));

if ($cantidadNormalized === '') {
    $errores[] = 'Introduce una cantidad.';
} elseif (!is_numeric($cantidadNormalized)) {
    $errores[] = 'La cantidad debe ser un número válido.';
} else {
    $cantidad = (float)$cantidadNormalized;
    if ($cantidad <= 0) {
        $errores[] = 'La cantidad debe ser mayor que cero.';
    }
}

if (empty($errores)) {
    $cantidad_en_eur = $cantidad / $tipoCambio[$origen];
    $cantidad_destino = $cantidad_en_eur * $tipoCambio[$destino];

    $resultados['input'] = number_format($cantidad, 2, ',', '.');
    $resultados['origen_desc'] = $monedas[$origen];
    $resultados['destino_desc'] = $monedas[$destino];
    $resultados['output'] = number_format($cantidad_destino, 2, ',', '.');
}
?>
<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>Conversor de monedas</title>
</head>

<body>
    <h1>Conversor de monedas</h1>

    <?php if (!empty($errores)): ?>
        <div style="color:#c00">
            <ul>
                <?php foreach ($errores as $e): ?><li><?= htmlspecialchars($e, ENT_QUOTES, 'UTF-8') ?></li><?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <form action="<?= htmlspecialchars($_SERVER['PHP_SELF'], ENT_QUOTES, 'UTF-8') ?>" method="post">
        <label>Cantidad:
            <input type="text" name="cantidad" value="<?= htmlspecialchars($cantidad, ENT_QUOTES, 'UTF-8') ?>" required>
        </label><br><br>

        <label>Origen:
            <select name="origen" required>
                <?php foreach ($monedas as $code => $desc): ?>
                    <option value="<?= $code ?>" <?= ($origen === $code) ? 'selected' : '' ?>><?= htmlspecialchars("$code — $desc", ENT_QUOTES, 'UTF-8') ?></option>
                <?php endforeach; ?>
            </select>
        </label><br><br>

        <label>Destino:
            <select name="destino" required>
                <?php foreach ($monedas as $code => $desc): ?>
                    <option value="<?= $code ?>" <?= ($destino === $code) ? 'selected' : '' ?>><?= htmlspecialchars("$code — $desc", ENT_QUOTES, 'UTF-8') ?></option>
                <?php endforeach; ?>
            </select>
        </label><br><br>

        <button type="submit">Convertir</button>
    </form>

    <?php if (!empty($resultados)): ?>
        <h2>Resultado</h2>
        <p><?= htmlspecialchars($resultados['input'], ENT_QUOTES, 'UTF-8') ?> <?= htmlspecialchars($resultados['origen_desc'], ENT_QUOTES, 'UTF-8') ?> son <?= htmlspecialchars($resultados['output'], ENT_QUOTES, 'UTF-8') ?> <?= htmlspecialchars($resultados['destino_desc'], ENT_QUOTES, 'UTF-8') ?>.</p>
    <?php endif; ?>
</body>

</html>