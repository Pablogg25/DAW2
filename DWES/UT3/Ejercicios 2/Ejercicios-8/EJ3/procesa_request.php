<?php
header('Content-Type: text/html; charset=utf-8');
$nombre = $_REQUEST['nombre'];
$modulo = $_REQUEST['modulo'];
echo '<h1>FORMULARIO GET</h1>';
echo '<p>El nombre es ' . $nombre . '</p>';
echo '<p>El modulo es ' . $modulo . '</p>';
echo '<p><a href="ejercicio1_get.html">Volver</a></p>';
