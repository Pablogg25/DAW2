<?php
require __DIR__ . '/../vendor/autoload.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Generador de Contraseñas</title>
</head>
<body>
    <h1>Generador de Contraseñas</h1>
    <form action="procesa.php" method="post">
        <label><input type="checkbox" name="mayusculas"> Mayúsculas</label><br>
        <label><input type="checkbox" name="minusculas"> Minúsculas</label><br>
        <label><input type="checkbox" name="numeros"> Números</label><br>
        <label><input type="checkbox" name="simbolos"> Símbolos</label><br>
        <label>Longitud: <input type="number" name="longitud" value="8" min="4" max="32"></label><br><br>
        <button type="submit">Generar Contraseña</button>
    </form>
    <hr>
    <h2>Historial de contraseñas generadas</h2>
    <?php
    session_start();
    if (!empty($_SESSION['passwords'])) {
        echo "<ul>";
        foreach ($_SESSION['passwords'] as $pwd) {
            echo "<li>$pwd</li>";
        }
        echo "</ul>";
    }
    ?>
</body>
</html>
