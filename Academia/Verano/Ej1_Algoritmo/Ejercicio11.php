<?php
function puedeRepresentarse($n) {
    for ($y = 0; $y <= floor($n / 7); $y++) {
        $resto = $n - 7 * $y;
        if ($resto >= 0 && $resto % 2 == 0) {
            return true;
        }
    }
    return false;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['n'])) {
    $n = intval($_POST['n']);
    $resultado = puedeRepresentarse($n);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Representación como 2x + 7y</title>
</head>
<body>
    <form method="post">
        <label for="n">Número entero (n):</label>
        <input type="number" name="n" id="n" required>
        <button type="submit">Comprobar</button>
    </form>

    <?php if (isset($resultado)): ?>
        <p><?= $resultado ? 'Sí' : 'No' ?> se puede representar como n = 2x + 7y.</p>
    <?php endif; ?>
</body>
</html>