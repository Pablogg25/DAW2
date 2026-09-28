<?php require "05-ConfirmacionCompra-Datos2.php"; ?>

<?php
// Cálculos
$subtotal      = $precio * $cantidad;
$baseImponible = $subtotal + $envio;
$ivaCalculado  = $baseImponible * 0.21;   
$total         = $baseImponible + $ivaCalculado;
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Confirmación de pedido</title>

      <link rel="stylesheet" href="05-ConfirmacionCompra-Estilos.css">
</head>

<body>

<div class="contenedor">

    <h2>Revisión del pedido</h2>

    <table>
        <tr>
            <th>Número de pedido</th>
            <td id="numero-pedido"><?php echo $pedido; ?></td>
        </tr>
        <tr>
            <th>Producto</th>
            <td><?php echo $producto; ?></td>
        </tr>
        <tr>
            <th>Precio por unidad</th>
            <td><?php echo $precio; ?> €</td>
        </tr>
        <tr>
            <th>Cantidad</th>
            <td><?php echo $cantidad; ?></td>
        </tr>
        <tr>
            <th>Subtotal</th>
            <td><?php echo $subtotal; ?> €</td>
        </tr>
        <tr>
            <th>Gastos de envío</th>
            <td><?php echo $envio; ?> €</td>
        </tr>
        <tr>
            <th>IVA (21%)</th>
            <td><?php echo number_format($ivaCalculado, 2); ?> €</td>
        </tr>
        <tr>
            <th>Total</th>
            <td class="total"><?php echo number_format($total, 2); ?> €</td>
        </tr>
    </table>

    <h3>Datos de envío</h3>

    <form method="post">

        <label for="cliente">Nombre del cliente</label>
        <input type="text" id="cliente" name="cliente" value="<?php echo $cliente; ?>">

        <label for="idDocumento">CIF / DNI</label>
        <input type="text" id="idDocumento" name="idDocumento" value="<?php echo $idDocumento; ?>">

        <label for="urgente">Envío urgente</label>
        <input type="checkbox" id="urgente" name="urgente">
        <small>Estado actual: <?php echo $envioUrgente ? "Sí" : "No"; ?></small>

        <label for="direccion">Dirección de entrega</label>
        <input type="text" id="direccion" name="direccion" value="<?php echo $direccion; ?>">

        <label for="observaciones">Observaciones</label>
        <textarea id="observaciones" name="observaciones"><?php echo $observaciones; ?></textarea>

        <button type="submit" formaction="modificar-pedido.php">Modificar datos</button>
        <button type="submit" formaction="confirmar-pedido.php">Confirmar pedido</button>

    </form>

</div>

</body>
</html>
