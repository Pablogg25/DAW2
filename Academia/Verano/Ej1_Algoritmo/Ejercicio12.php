<?php
function minimoIncrementos($a, $b) {
    if ($a >= $b) return "a debe ser menor que b";
    
    $contador = 0;
    
    while ($a != $b) {
        if ($b - $a >= 2) {
            $a += 1;
            $b += 2;
            $contador += 2;
        } else {
            $a += 1;
            $contador += 1;
        }
    }
    
    return $contador;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['a']) && isset($_POST['b'])) {
    $a = intval($_POST['a']);
    $b = intval($_POST['b']);
    if ($a < $b) {
        $incrementos = minimoIncrementos($a, $b);
    } else {
        $error = "a debe ser menor que b";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Igualar números con incrementos</title>
</head>
<body>
    <form method="post">
        <label for="a">Número a (menor que b):</label>
        <input type="number" name="a" id="a" required>
        <br>
        <label for="b">Número b (mayor que a):</label>
        <input type="number" name="b" id="b" required>
        <button type="submit">Calcular</button>
    </form>

    <?php if (isset($incrementos)): ?>
        <p>Número mínimo de incrementos: <?= $incrementos ?></p>
    <?php elseif (isset($error)): ?>
        <p style="color: red;"><?= $error ?></p>
    <?php endif; ?>
</body>
</html>