<?php
function esCiclico($angulo1, $angulo2, $angulo3) {
    $angulo4 = 360 - $angulo1 - $angulo2 - $angulo3;
    return ($angulo1 + $angulo3 == 180) && ($angulo2 + $angulo4 == 180);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['angulo1']) && isset($_POST['angulo2']) && isset($_POST['angulo3'])) {
    $angulo1 = intval($_POST['angulo1']);
    $angulo2 = intval($_POST['angulo2']);
    $angulo3 = intval($_POST['angulo3']);
    $ciclico = esCiclico($angulo1, $angulo2, $angulo3);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Comprobar cuadrilátero cíclico</title>
</head>
<body>
    <form method="post">
        <label for="angulo1">Primer ángulo:</label>
        <input type="number" name="angulo1" id="angulo1" min="1" max="179" required>
        <br>
        <label for="angulo2">Segundo ángulo:</label>
        <input type="number" name="angulo2" id="angulo2" min="1" max="179" required>
        <br>
        <label for="angulo3">Tercer ángulo:</label>
        <input type="number" name="angulo3" id="angulo3" min="1" max="179" required>
        <button type="submit">Comprobar</button>
    </form>

    <?php if (isset($ciclico)): ?>
        <p>El cuadrilátero <?= $ciclico ? 'es cíclico' : 'no es cíclico' ?>.</p>
    <?php endif; ?>
</body>
</html>