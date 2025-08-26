<?php
    function esPrimo($numero) {
        if($numero <= 1) {
            return false;
        }
        for($i = 2; $i <= sqrt($numero); $i++) {
            if($numero % $i == 0) {
                return false;
            }
        }
        return true;
    }

    function obtenerDivisores($numero) {
        $divisores = [];
        for($i = 1; $i <= $numero/2; $i++) {
            if($numero % $i == 0) {
                $divisores[] = $i;
            }
        }
        return $divisores;
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $numero = intval($_POST['numero']);
        $esPrimo = esPrimo($numero);
        $divisores = obtenerDivisores($numero);
}
    
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comprobar numero primo</title>
</head>
<body>
    <form method="post">
        <label for="numero">Introduce Numero: </label>
        <input type="number" name="numero" id="numero" required>
        <button type="submit">Comprobar</button>
    </form>
    <?php if(isset($numero)): ?>
        <p>El numero <?=$numero ?><?= $esPrimo ? ' es primo' : ' no es primo'?></p>
        <?php if(!$esPrimo): ?>
            <p>Divisores: <?= implode(', ', $divisores) ?></p>
        <?php endif; ?>
    <?php endif; ?>
</body>
</html>