<?php
function esPerfecto($numero) {
    if ($numero <= 1) return false;
    
    $sumaDivisores = 1; // 1 es divisor universal
    
    for ($i = 2; $i <= sqrt($numero); $i++) {
        if ($numero % $i == 0) {
            $sumaDivisores += $i;
            $otroDivisor = $numero / $i;
            if ($otroDivisor != $i) {
                $sumaDivisores += $otroDivisor;
            }
        }
    }
    
    return $sumaDivisores == $numero;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['numero'])) {
    $numero = intval($_POST['numero']);
    $perfecto = esPerfecto($numero);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Comprobar número perfecto</title>
</head>
<body>
    <form method="post">
        <label for="numero">Introduce un número:</label>
        <input type="number" name="numero" id="numero" min="1" required>
        <button type="submit">Comprobar</button>
    </form>

    <?php if (isset($perfecto)): ?>
        <p>El número <?= $numero ?> <?= $perfecto ? 'es perfecto' : 'no es perfecto' ?>.</p>
    <?php endif; ?>
</body>
</html>