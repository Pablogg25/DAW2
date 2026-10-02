<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Confirmación de reserva</title>

<style>
body{
font-family: Arial, sans-serif;
background:#f0f4f8;
padding:40px;
}

.documento{
max-width:800px;
margin:auto;
background:white;
padding:30px;
border-radius:10px;
box-shadow:0 0 12px rgba(0,0,0,.15);
}

h1{
color:#0b7a24;
}

table{
width:100%;
border-collapse:collapse;
margin-top:20px;
}

th, td{
border:1px solid #ccc;
padding:10px;
text-align:left;
}

th{
background:#efefef;
}

.info{
margin-top:30px;
padding:15px;
background:#f8f8f8;
border-left:5px solid #1e88e5;
}
</style>
</head>
<body>

<?php

$huesped = "Carlos Pérez"; // proporcionado por el servidor
$hotel = "Hotel Bahía"; // proporcionado por el servidor
$noches = 4; // proporcionado por el servidor
$precioNoche = 95; // proporcionado por el servidor
$habitacion = 204; // proporcionado por el servidor
$codigoReserva = "HB2026A"; // proporcionado por el servidor

$importe = $noches * $precioNoche;
$iva = $importe * 10 / 100;
$total = $importe + $iva;

?>

<div class="documento">

<h1>✅ Reserva confirmada</h1>

<p>
Código de reserva:
<strong><?= $codigoReserva ?></strong>
</p>

<p>
<?= $huesped ?>, tu estancia de <?= $noches ?>
noches en <?= $hotel ?> ha sido registrada.
</p>

<table>
<tr>
<th>Concepto</th>
<th>Valor</th>
</tr>

<tr>
<td>Hotel</td>
<td><?= $hotel ?></td>
</tr>

<tr>
<td>Habitación</td>
<td><?= $habitacion ?></td>
</tr>

<tr>
<td>Noches</td>
<td><?= $noches ?></td>
</tr>

<tr>
<td>Precio por noche</td>
<td><?= number_format($precioNoche,2) ?> €</td>
</tr>

<tr>
<td>Importe estancia</td>
<td><?= number_format($importe,2) ?> €</td>
</tr>

<tr>
<td>IVA (10%)</td>
<td><?= number_format($iva,2) ?> €</td>
</tr>

<tr>
<td>Total</td>
<td><?= number_format($total,2) ?> €</td>
</tr>
</table>

<section class="info">
<h2>Información para tu llegada</h2>

<p>Presenta tu código de reserva en recepción.</p>

<p>La habitación estará disponible a partir de las 14:00 horas.</p>
</section>

</div>

</body>
</html>
