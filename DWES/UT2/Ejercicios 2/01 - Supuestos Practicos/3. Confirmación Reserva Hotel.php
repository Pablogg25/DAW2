<?php
$huesped        = "Carlos Martínez";
$hotel          = "Hotel Bahía";
$noches         = 4;
$precioNoche    = 75.00;
$habitacion     = 312;
$codigoReserva  = "HB-98452";

$importe        = $noches * $precioNoche;
$iva            = $importe * 0.10;
$total          = $importe + $iva;

$frase = "$huesped, tu estancia de $noches noches en $hotel ha sido registrada.";
?>

<h2 style="font-family:Arial; text-align:center;">Confirmación de Reserva</h2>

<p style="font-family:Arial; text-align:center;">
    Código de reserva: <strong><?php echo $codigoReserva; ?></strong>
</p>

<p style="font-family:Arial;">
    <?php echo $frase; ?>
</p>

<table style="width:100%; max-width:600px; margin:20px auto; border-collapse:collapse; font-family:Arial;">
    <tr>
        <th style="border:1px solid #ccc; padding:8px;">Hotel</th>
        <td style="border:1px solid #ccc; padding:8px;"><?php echo $hotel; ?></td>
    </tr>
    <tr>
        <th style="border:1px solid #ccc; padding:8px;">Habitación</th>
        <td style="border:1px solid #ccc; padding:8px;"><?php echo $habitacion; ?></td>
    </tr>
    <tr>
        <th style="border:1px solid #ccc; padding:8px;">Noches</th>
        <td style="border:1px solid #ccc; padding:8px;"><?php echo $noches; ?></td>
    </tr>
    <tr>
        <th style="border:1px solid #ccc; padding:8px;">Precio por noche</th>
        <td style="border:1px solid #ccc; padding:8px;"><?php echo number_format($precioNoche, 2); ?> €</td>
    </tr>
    <tr>
        <th style="border:1px solid #ccc; padding:8px;">Importe</th>
        <td style="border:1px solid #ccc; padding:8px;"><?php echo number_format($importe, 2); ?> €</td>
    </tr>
    <tr>
        <th style="border:1px solid #ccc; padding:8px;">IVA (10 %)</th>
        <td style="border:1px solid #ccc; padding:8px;"><?php echo number_format($iva, 2); ?> €</td>
    </tr>
    <tr>
        <th style="border:1px solid #ccc; padding:8px;">Total</th>
        <td style="border:1px solid #ccc; padding:8px;"><strong><?php echo number_format($total, 2); ?> €</strong></td>
    </tr>
</table>

<h3 style="font-family:Arial; text-align:center;">Información para tu llegada</h3>

<p style="font-family:Arial; max-width:600px; margin:0 auto;">
    Presenta este documento en recepción junto con tu identificación.  
    La entrada está disponible a partir de las 14:00 y la salida hasta las 12:00.  
    Si necesitas cualquier servicio adicional, el personal del hotel estará encantado de ayudarte.
</p>
