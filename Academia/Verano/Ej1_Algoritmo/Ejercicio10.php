<?php
function puedeSerMultiploDe5($d, $n) {
    // Un número es múltiplo de 5 si termina en 0 o 5
    $digitos = str_split($n);
    return in_array('0', $digitos) || in_array('5', $digitos);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['d']) && isset($_POST['n'])) {
    $d = intval($_POST['d']);
    $n = $_POST['n'];
    $posible = puedeSerMultiploDe5($d, $n);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Reordenar para múltiplo de 5</title>
</head>
<body>
    <form method="post">
        <label for="d">Número de cifras (D):</label>
        <input type="number" name="d" id="d" min="1" required>
        <br>
        <label for="n">Número (N):</label>
        <input type="text" name="n" id="n" pattern="\d+" required>
        <button type="submit">Comprobar</button>
    </form>

    <?php if (isset($posible)): ?>
        <p><?= $posible ? 'Sí' : 'No' ?> es posible reordenar los dígitos para obtener un múltiplo de 5.</p>
    <?php endif; ?>
</body>
</html>