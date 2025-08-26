<?php
function esPrimo($n) {
    if ($n <= 1) return false;
    for ($i = 2; $i <= sqrt($n); $i++) {
        if ($n % $i == 0) return false;
    }
    return true;
}

function esCapicua($n) {
    return $n == strrev($n);
}

function esPrimoCuadradoReversible($n) {
    $raiz = sqrt($n);
    if ($raiz != floor($raiz)) return false;
    if (!esPrimo($raiz)) return false;
    if (esCapicua($n)) return false;
    
    $reverso = strrev($n);
    $raizReverso = sqrt($reverso);
    return $raizReverso == floor($raizReverso) && esPrimo($raizReverso);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['numero'])) {
    $numero = $_POST['numero'];
    if (is_numeric($numero) && $numero > 0) {
        $esPCR = esPrimoCuadradoReversible($numero);
        if ($esPCR) {
            $reverso = strrev($numero);
            $primoOriginal = sqrt($numero);
            $primoReverso = sqrt($reverso);
        }
    } else {
        $error = "Debe ingresar un número positivo";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Primo cuadrado reversible</title>
</head>
<body>
    <form method="post">
        <label for="numero">Introduce un número:</label>
        <input type="text" name="numero" id="numero" required>
        <button type="submit">Verificar</button>
    </form>

    <?php if (isset($esPCR)): ?>
        <?php if ($esPCR): ?>
            <p>El número <?= $numero ?> ES primo cuadrado reversible</p>
            <p>Reverso: <?= $reverso ?></p>
            <p>Primo original: <?= $primoOriginal ?></p>
            <p>Primo reverso: <?= $primoReverso ?></p>
        <?php else: ?>
            <p>El número <?= $numero ?> NO es primo cuadrado reversible</p>
        <?php endif; ?>
    <?php elseif (isset($error)): ?>
        <p style="color: red;"><?= $error ?></p>
    <?php endif; ?>
</body>
</html>