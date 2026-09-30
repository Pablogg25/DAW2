<?php
// Fusiona los datos que antes venían de dos archivos distintos:
// los de "otro módulo del servidor" y los de "un intento anterior del formulario".

// --- Datos del servidor (evento) ---
$nombreEvento = "TechLab Santander";
$fechaEvento = "2026-10-12";
$precioBase = 20.00;
$precioPorHora = 12.50;
$mensajePublico = "Consulta el programa y reserva tu plaza.";
$menuActivo = "Reserva";

// --- Datos del cliente (intento anterior del formulario) ---
$nombre = "Lucía";
$email = "lucia@ejemplo.com";
$horas = "3.5";
$totalDeclarado = "63.75";
$fechaReserva = "2026-10-05";
$comentario = "";
$modoOscuro = true;
$sesionIniciada = true;
?>
