<?php
function divisionPorRestas($dividendo, $divisor)
{
    $cociente = 0;
    $resto = $dividendo;
    while ($resto >= $divisor) {
        $resto -= $divisor;
        $cociente++;
    }
    return ['cociente' => $cociente, 'resto' => $resto];
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['n1']) && isset($_POST['n2'])) {
    $n1 = intval($_POST['n1']);
    $n2 = intval($_POST['n2']);
    if ($n2 != 0) {
        $resultado = divisionPorRestas($n1, $n2);
    } else {
        $error = "El divisor no puede ser cero";
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Division por restas sucesivas</title>
</head>

<body>
    <form method="post">
        <label for="dividendo">Dividendo: </label>
        <input type="number" name="n1" id="n1" required>
        <br>
        <label for="divisor">Divisor: </label>
        <input type="number" name="n2" id="n2" required>
        <br>
        <button type="submit">Calcular</button>
    </form>
    <?php if (isset($resultado)): ?>
        <p>Cociente</p><?= $resultado['cociente'] ?>
        <p>Resto</p><?= $resultado['resto'] ?>
    <?php elseif (isset($error)): ?>
        <p style="color: red;"><?= $error ?></p>
    <?php endif; ?>

</body>

</html>