<?php

echo '<br><strong>Días del mes hasta hoy:</strong><br>';

$diaActual = date('j'); // Día actual del mes (sin ceros iniciales)
$mesActual = date('m');
$anioActual = date('Y');

for ($i = 1; $i <= $diaActual; $i++) {
    $fecha = date('d-m-Y', strtotime("$anioActual-$mesActual-$i"));
    echo $fecha . '<br>';
}
