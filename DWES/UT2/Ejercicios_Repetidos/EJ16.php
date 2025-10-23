<?php
// Fecha de nacimiento (puedes cambiarla o recibirla por formulario)
$fechaNacimiento = "2006-03-25";

// Convertimos la fecha de nacimiento a timestamp
$timestampNacimiento = strtotime($fechaNacimiento);

// Obtenemos el timestamp actual
$timestampActual = time();

// Calculamos la diferencia en segundos
$diferencia = $timestampActual - $timestampNacimiento;

// Convertimos segundos a años aproximados
$edad = floor($diferencia / (60 * 60 * 24 * 365));

// Mostramos el resultado
echo "Fecha de nacimiento: " . date("d-m-Y", $timestampNacimiento) . "<br>";
echo "Edad aproximada: $edad años";
