<?php
// procesa_post.php
header('Content-Type: text/html; charset=utf-8');
$nombre = $_POST['nombre'] ?? '';
$modulo = $_POST['modulo'] ?? '';
echo "<h1>Resultado (POST)</h1>";
echo "<p>Nombre: " . htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8') . "</p>";
echo "<p>Módulo: " . htmlspecialchars($modulo, ENT_QUOTES, 'UTF-8') . "</p>";
echo '<p><a href="ejercicio1_post.html">Volver</a></p>';
