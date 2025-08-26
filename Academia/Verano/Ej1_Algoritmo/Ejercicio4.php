<?php
function invertirNumero($numero) {
    $invertido = 0;
    while ($numero > 0) {
        $digito = $numero % 10;
        $invertido = $invertido * 10 + $digito;
        $numero = (int)($numero / 10);
    }
    return $invertido;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['numero'])) {
    $numero = intval($_POST['numero']);
    $invertido = invertirNumero($numero);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Invertir número</title>
</head>
<body>
    <form method="post">
        <label for="numero">Introduce un número:</label>
        <input type="number" name="numero" id="numero" min="1" required>
        <button type="submit">Invertir</button>
    </form>

    <?php if (isset($invertido)): ?>
        <p>Número invertido: <?= $invertido ?></p>
    <?php endif; ?>
</body>
</html>