<?php

$anio = date("Y");

echo "<h1>Calendario $anio</h1>";

for ($mes = 1; $mes <= 12; $mes++) {

    $diasMes = cal_days_in_month(CAL_GREGORIAN, $mes, $anio);

    $nombreMes = date("F", mktime(0, 0, 0, $mes, 1, $anio));

    $primerDia = date("N", mktime(0, 0, 0, $mes, 1, $anio));

    echo "<h2>$nombreMes</h2>";

    echo "<table border='1' cellpadding='5' cellspacing='0'>";
    echo "<tr>
            <th>Lun</th>
            <th>Mar</th>
            <th>Mié</th>
            <th>Jue</th>
            <th>Vie</th>
            <th>Sáb</th>
            <th>Dom</th>
          </tr>";

    echo "<tr>";

    for ($i = 1; $i < $primerDia; $i++) {
        echo "<td></td>";
    }

    $columna = $primerDia;

    for ($dia = 1; $dia <= $diasMes; $dia++) {

        echo "<td>$dia</td>";

        if ($columna == 7) {
            echo "</tr><tr>";
            $columna = 1;
        } else {
            $columna++;
        }
    }

    if ($columna != 1) {
        for ($i = $columna; $i <= 7; $i++) {
            echo "<td></td>";
        }
    }

    echo "</tr>";
    echo "</table><br>";
}
?>
