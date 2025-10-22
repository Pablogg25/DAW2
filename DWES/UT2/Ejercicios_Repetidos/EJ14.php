<?php
// Definir dos fechas
$fecha1 = "2025-09-25";
$fecha2 = "2025-10-01";

// Convertir a timestamp
$ts1 = strtotime($fecha1);
$ts2 = strtotime($fecha2);

// Comparar usando ternario
$resultado = ($ts1 < $ts2) ? "La primera fecha es anterior" : "La primera fecha no es anterior";

echo "Fecha 1: $fecha1<br>";
echo "Fecha 2: $fecha2<br>";
echo $resultado;
