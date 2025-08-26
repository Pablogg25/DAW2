<?php
function mcd($a, $b) {
    while ($b != 0) {
        $temp = $a % $b;
        $a = $b;
        $b = $temp;
    }
    return $a;
}

function factorialGauss($n) {
    $producto = 1;
    for ($i = 1; $i <= $n; $i++) {
        if (mcd($i, $n) == 1) {
            $producto *= $i;
        }
    }
    return $producto;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['numero'])) {
    $numero = intval($_POST['numero']);
    $resultado = factorialGauss($numero);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Factorial de Gauss</title>
</head>
<body>
    <form method="post">
        <label for="numero">Introduce un número:</label>
        <input type="number" name="numero" id="numero" min="1" required>
        <button type="submit">Calcular</button>
    </form>

    <?php if (isset($resultado)): ?>
        <p>El factorial de Gauss de <?= $numero ?> es <?= $resultado ?></p>
    <?php endif; ?>
</body>
</html>