<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Ejercicio 6 - Datos</title>
</head>

<body>
    <h2>Lista de Pares de Números</h2>

    <?php
    if (isset($_POST['num1']) && isset($_POST['num2'])) {
        $num1 = intval($_POST['num1']);
        $num2 = intval($_POST['num2']);

        $menor = min($num1, $num2);
        $mayor = max($num1, $num2);

        echo "<ul>";
        for ($i = $menor, $j = $mayor; $i <= $mayor; $i++, $j--) {
            echo "<li>$i - $j</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>No se han recibido los datos correctamente.</p>";
    }
    ?>

    <p><a href="index.html">Volver</a></p>
</body>

</html>