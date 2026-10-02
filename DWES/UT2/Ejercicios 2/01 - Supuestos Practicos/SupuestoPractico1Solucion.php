<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Ticket de cafetería</title>

<style>
body{
font-family: Arial, sans-serif;
background-color:#f2f2f2;
}

.ticket{
width:400px;
margin:40px auto;
background:white;
padding:25px;
border-radius:10px;
box-shadow:0 0 10px rgba(0,0,0,.2);
}

h1{
text-align:center;
margin-top:0;
}

.linea{
display:flex;
justify-content:space-between;
margin:8px 0;
}

.total{
margin-top:15px;
border-top:2px solid #ccc;
padding-top:15px;
font-weight:bold;
}
</style>
</head>
<body>

<?php

$cliente = "Lucía García"; // proporcionado por el servidor
$producto = "Café Latte"; // proporcionado por el servidor
$precioUnitario = 2.80; // proporcionado por el servidor
$cantidad = 3; // proporcionado por el servidor

$importe = $precioUnitario * $cantidad;
$iva = $importe * 10 / 100;
$total = $importe + $iva;

?>

<div class="ticket">

<h1>☕ Cafetería Central</h1>

<div class="linea">
<span>Cliente:</span>
<span><?= $cliente ?></span>
</div>

<div class="linea">
<span>Producto:</span>
<span><?= $producto ?></span>
</div>

<div class="linea">
<span>Precio unidad:</span>
<span><?= number_format($precioUnitario, 2) ?> €</span>
</div>

<div class="linea">
<span>Cantidad:</span>
<span><?= $cantidad ?></span>
</div>

<hr>

<div class="linea">
<span>Base imponible:</span>
<span><?= number_format($importe, 2) ?> €</span>
</div>

<div class="linea">
<span>IVA (10%):</span>
<span><?= number_format($iva, 2) ?> €</span>
</div>

<div class="linea total">
<span>Total:</span>
<span><?= number_format($total, 2) ?> €</span>
</div>

</div>

</body>
</html>

