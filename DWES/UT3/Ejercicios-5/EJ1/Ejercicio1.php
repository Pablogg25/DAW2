<?php
require_once "Empleado.php";
require_once "Encargado.php";

// Creamos objetos de ambas clases
$empleado1 = new Empleado("Carlos López", 1800);
$encargado1 = new Encargado("Ana García", 1800);

// Mostramos la información
echo "<h2>Comparativa de sueldos</h2>";
echo "<p><strong>Empleado:</strong> " . $empleado1->getNombre() . "<br>";
echo "Sueldo: " . number_format($empleado1->getSueldo(), 2, ',', '.') . " €</p>";

echo "<p><strong>Encargado:</strong> " . $encargado1->getNombre() . "<br>";
echo "Sueldo: " . number_format($encargado1->getSueldo(), 2, ',', '.') . " €</p>";
