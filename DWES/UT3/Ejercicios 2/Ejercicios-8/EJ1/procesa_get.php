<?php
// procesa_get.php
header('Content-Type: text/html; charset=utf-8');
$nombre = $_GET['nombre'];
$modulo = $_GET['modulo'];
echo '<h1>FORMULARIO GET</h1>';
echo '<p>El nombre es ' . $nombre . '</p>';
echo '<p>El modulo es ' . $modulo . '</p>';
echo '<p><a href="ejercicio1_get.html">Volver</a></p>';
