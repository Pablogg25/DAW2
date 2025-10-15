<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    // Establecer la zona horaria
    date_default_timezone_set("Europe/Madrid");
    // Obtener la fecha actual
    $fecha = getdate();
    // Mostrar la fecha en formato legible
    echo "Fecha actual: " . $fecha["mday"] . "/" . $fecha["mon"] . "/" . $fecha["year"] . "<br>";
    echo "Hora actual: " . $fecha["hours"] . ":" . $fecha["minutes"] . ":" . $fecha["seconds"];
    ?>
</body>

</html>