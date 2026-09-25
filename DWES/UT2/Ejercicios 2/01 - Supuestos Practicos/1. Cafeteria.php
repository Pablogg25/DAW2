<?php
$cliente       = "Pablo González García";
$producto      = "Café Latte";
$precioUnidad  = 2.50;
$cantidad      = 3;

$baseImponible = $precioUnidad * $cantidad;
$iva           = $baseImponible * 0.10;
$total         = $baseImponible + $iva;
?>

<h3>Cafetería Central</h3>

<div>
    <p><strong>Cliente:</strong> <?php echo $cliente; ?></p>
    <p><strong>Producto:</strong> <?php echo $producto; ?></p>
    <p><strong>Precio unidad:</strong> <?php echo number_format($precioUnidad, 2); ?> €</p>
    <p><strong>Cantidad:</strong> <?php echo $cantidad; ?></p>
    <hr>
    <p><strong>Importe total:</strong> <?php echo number_format($baseImponible, 2); ?> €</p>
    <p><strong>Base imponible:</strong> <?php echo number_format($baseImponible, 2); ?> €</p>
    <p><strong>IVA (10 %):</strong> <?php echo number_format($iva, 2); ?> €</p>
    <p><strong>Total con IVA:</strong> <?php echo number_format($total, 2); ?> €</p>
</div>
