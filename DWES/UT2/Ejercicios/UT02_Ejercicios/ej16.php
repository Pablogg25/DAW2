
<?php
// Fecha de nacimiento en formato correcto
$fechaNacimiento = "2006-03-25";

// Timestamp de la fecha de nacimiento
$tsNacimiento = strtotime($fechaNacimiento);
// Timestamp actual
$tsActual = time();

// Calcular la diferencia en segundos y convertir a años
$edad = floor(($tsActual - $tsNacimiento) / (365.25 * 24 * 60 * 60));

echo "Fecha de nacimiento: $fechaNacimiento<br>";
echo "Edad aproximada: $edad años";
