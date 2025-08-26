<?php
    function multiplicacionRusa($m,$n){
        $resultado = 0;
        while ($m > 0){
            if($m % 2 !=0){
                $resultado += $n;
            }
            $m = (int)($m / 2);
            $n *= 2;
        }
        return $resultado;
    }
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['m']) && isset($_POST['n'])) {
        $m = intval($_POST['m']);
        $n = intval($_POST['n']);
        $resultado = multiplicacionRusa($m, $n);
        
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multiplicacion rusa</title>
</head>
<body>
    <form method="post">
        <label for="m">Primer numero (M)</label>
        <input type="number" name="m" id="m" min="1" required>
        <br>
        <label for="n">Segundo numero (N)</label>
        <input type="number" name="n" id="n" min="1" required>
        <button type="submit">Calcular</button>
    </form>
    <?php if (isset($resultado)): ?>
        <p>El Resulado de multiplicar M por N es: <?=$resultado?></p>
    <?php endif; ?>
</body>
</html>