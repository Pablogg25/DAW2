<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Conversión de monedas a euros</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f8;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30px;
        }

        table {
            border-collapse: collapse;
            width: 70%;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 20px;
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

        .resumen {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            width: 70%;
        }
    </style>
</head>

<body>

    <?php
    // MATRIZ 3D: País, Moneda, Tipo de cambio
    $monedas = [
        ["País" => "EEUU", "Moneda" => "Dollar", "Cambio" => 1.1741],
        ["País" => "UK", "Moneda" => "Libra esterlina", "Cambio" => 0.8734],
        ["País" => "Japón", "Moneda" => "Yenes", "Cambio" => 173.76],
        ["País" => "China", "Moneda" => "Yuanes", "Cambio" => 8.3591],
        ["País" => "Argentina", "Moneda" => "Pesos Argentinos", "Cambio" => 1621.36],
        ["País" => "Australia", "Moneda" => "Dollar AUS", "Cambio" => 1.776]
    ];

    // Mostrar la tabla
    echo "<table>";
    echo "<caption>Conversión de monedas a euros</caption>";
    echo "<tr><th>País</th><th>Moneda</th><th>Tipo de cambio (1€ = ...)</th></tr>";

    $cambios = []; // Para cálculos de promedio, mínimo y máximo

    foreach ($monedas as $dato) {
        echo "<tr>";
        echo "<td>{$dato['País']}</td>";
        echo "<td>{$dato['Moneda']}</td>";
        echo "<td>{$dato['Cambio']}</td>";
        echo "</tr>";
        $cambios[] = $dato['Cambio'];
    }

    echo "</table>";

    // Calcular tipo medio, más bajo y más alto
    $media = array_sum($cambios) / count($cambios);
    $minimo = min($cambios);
    $maximo = max($cambios);

    // Mostrar resultados
    echo "<div class='resumen'>";
    echo "<h3>📊 Resumen de tipos de cambio</h3>";
    echo "<p><strong>Tipo medio:</strong> " . round($media, 4) . "</p>";
    echo "<p><strong>Tipo más bajo:</strong> " . $minimo . "</p>";
    echo "<p><strong>Tipo más alto:</strong> " . $maximo . "</p>";
    echo "</div>";
    ?>

</body>

</html>