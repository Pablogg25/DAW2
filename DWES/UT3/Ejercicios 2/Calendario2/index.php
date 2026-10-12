<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="estilos.css">
</head>

<body>
    
    <?php
    $año = 2026;
    echo "<h1>Calendario de $año</h1>";
    echo "<div class='tabla'>";
    for ($mes = 1; $mes < 13; $mes++) {
        $diaInicio = date('N', mktime(0, 0, 0, $mes, 1, $año));
        ;
        $dia = 1;
        $diasMax = date('t', mktime(0, 0, 0, $mes, 1, $año));
        ;
        $nombreMes = match ($mes) {
            1 => "Enero",
            2 => "Febrero",
            3 => "Marzo",
            4 => "Abril",
            5 => "Mayo",
            6 => "Junio",
            7 => "Julio",
            8 => "Agosto",
            9 => "Septiembre",
            10 => "Octubre",
            11 => "Noviembre",
            12 => "Diciembre",
        };
        echo "<div class='mes'>";
        echo "<h4>$nombreMes</h4>";
        
        echo "<table border='1'>";
        echo "
            <tr>
                <td>L</td>
                <td>M</td>
                <td>X</td>
                <td>J</td>
                <td>V</td>
                <td>S</td>
                <td>D</td>
            </tr>";
        for ($fila = 0; $fila < 5; $fila++) {
            echo "<tr>";
            for ($columna = 1; $columna <= 7; $columna++) {
                if ($fila == 0 && $columna < $diaInicio) {
                    echo "<td></td>";
                } elseif ($dia <= $diasMax) {
                    echo "<td>$dia</td>";
                    $dia++;
                } else {
                    echo "<td></td>";
                }

            }
            echo "</tr>";
        }
        echo "</table>";
        echo "</div>";
    }
    echo "</div>";

    ?>
</body>

</html>