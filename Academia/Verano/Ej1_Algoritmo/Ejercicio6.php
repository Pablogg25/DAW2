<?php
function esCapicua($numero) {
    if (strlen($numero) != 6) return false;
    
    $digitos = str_split($numero);
    for ($i = 0; $i < 3; $i++) {
        if ($digitos[$i] != $digitos[5 - $i]) {
            return false;
        }
    }
    return true;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['numero'])) {
    $numero = $_POST['numero'];
    $capicua = esCapicua($numero);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Comprobar capicúa de 6 cifras</title>
</head>
<body>
    <form method="post">
        <label for="numero">Introduce un número de 6 cifras:</label>
        <input type="text" name="numero" id="numero" pattern="\d{6}" required>
        <button type="submit">Comprobar</button>
    </form>

    <?php if (isset($capicua)): ?>
        <p>El número <?= $numero ?> <?= $capicua ? 'es capicúa' : 'no es capicúa' ?>.</p>
    <?php endif; ?>
</body>
</html>