<?php
// Fecha específica
$fecha = "2025-09-25";
// Obtener el día de la semana
$diaSemana = date("l", strtotime($fecha));
// Traducir al español
$dias = [
    "Monday" => "Lunes",
    "Tuesday" => "Martes",
    "Wednesday" => "Miércoles",
    "Thursday" => "Jueves",
    "Friday" => "Viernes",
    "Saturday" => "Sábado",
    "Sunday" => "Domingo"
];
echo "La fecha $fecha corresponde a: " . $dias[$diaSemana];
