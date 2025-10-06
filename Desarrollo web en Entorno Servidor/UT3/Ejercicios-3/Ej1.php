<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Tabla de Escolarización por Comunidad Autónoma</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f6fa;
            display: flex;
            justify-content: center;
            padding: 30px;
        }

        table {
            border-collapse: collapse;
            width: 70%;
            background-color: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }

        th {
            background-color: #0077b6;
            color: white;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        caption {
            caption-side: top;
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 10px;
            color: #023e8a;
        }
    </style>
</head>

<body>

    <?php
    // Array bidimensional [Comunidad Autónoma, Número de alumnos por cada 1000 habitantes]
    $datos = [
        ["Andalucía", 593.6],
        ["Aragón", 600.3],
        ["Asturias", 582.9],
        ["Baleares", 489.7],
        ["Canarias", 573.2],
        ["Cantabria", 551.5],
        ["Castilla y León", 645.3],
        ["Castilla la Mancha", 555.8],
        ["Cataluña", 568.3],
        ["Comunidad Valenciana", 561.1],
        ["Extremadura", 584.3],
        ["Galicia", 600.1],
        ["Madrid", 613.3],
        ["Murcia", 564.7],
        ["Navarra", 638.1],
        ["País Vasco", 637.5],
        ["La Rioja", 562.4],
        ["Ceuta", 539.7],
        ["Melilla", 569.8]
    ];

    // Mostrar tabla
    echo "<table>";
    echo "<caption>Escolarización por cada 1000 habitantes</caption>";
    echo "<tr><th>Comunidad Autónoma</th><th>Número de alumnos (por 1000 hab.)</th><th>% Escolarización</th></tr>";

    foreach ($datos as $fila) {
        $comunidad = $fila[0];
        $alumnos = $fila[1];
        $porcentaje = round(($alumnos / 1000) * 100, 2); // cálculo del % de escolarización

        echo "<tr>";
        echo "<td>$comunidad</td>";
        echo "<td>$alumnos</td>";
        echo "<td>$porcentaje %</td>";
        echo "</tr>";
    }

    echo "</table>";
    ?>

</body>

</html>