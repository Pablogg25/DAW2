<?php
function segundoMasGrande($a, $b, $c) {
    $numeros = [$a, $b, $c];
    rsort($numeros);
    return $numeros[1];
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['a']) && isset($_POST['b']) && isset($_POST['c'])) {
    $a = intval($_POST['a']);
    $b = intval($_POST['b']);
    $c = intval($_POST['c']);
    $segundo = segundoMasGrande($a, $b, $c);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Segundo número más grande</title>
</head>
<body>
    <form method="post">
        <label for="a">Primer número:</label>
        <input type="number" name="a" id="a" min="1" required>
        <br>
        <label for="b">Segundo número:</label>
        <input type="number" name="b" id="b" min="1" required>
        <br>
        <label for="c">Tercer número:</label>
        <input type="number" name="c" id="c" min="1" required>
        <button type="submit">Calcular</button>
    </form>

    <?php if (isset($segundo)): ?>
        <p>El segundo número más grande es: <?= $segundo ?></p>
    <?php endif; ?>
</body>
</html>