<?php
require "05-ConfirmacionCompra-Datos.php";
?>

<!DOCTYPE html>
<html lang="es">
    <head>
    <meta charset="UTF-8">
    <title>Confirmación de Compra</title>
    <link rel="stylesheet" href="05-ConfirmacionCompra-Estilos.css">
</head>
<body>

    <?php
        $porcentajeIVA = 21;

        $subtotal = $precio * $cantidad;
        $baseImponible = $subtotal + $envio;
        $iva = $baseImponible * $porcentajeIVA / 100;
        $total = $baseImponible + $iva;

        $tipoDocumento = $tipoCliente === "particular"
                ? "dni"
                : "cif";
    ?>

    <div class="contenedor">

        <h1>✅ CONFIRMACIÓN DE COMPRA</h1>
        <p>Por favor, <?= $cliente ?>, revise los datos antes de continuar:</p>
        <h2> Resumen del  pedido</h2>
        <table>
            <tr>
                <td>Nº Pedido</td>
                <td id="numero-pedido"><?= $pedido ?></td>
            </tr>
            <tr>
                <td>Producto</td>
                <td><?= $producto ?></td>
            </tr>
            <tr>
                <td>Precio Unidad</td>
                <td><?= number_format($precio,2) ?> €</td>
            </tr>
            <tr>
                <td>Unidades</td>
                <td><?= $cantidad?></td>
            </tr>
            <tr>
                <td>Subtotal</td>
                <td><?= number_format($subtotal,2) ?> €</td>
            </tr>
            <tr>
                <td>Envío</td>
                <td><?= number_format($envio,2) ?> €</td>
            </tr>
            <tr>
                <td>Base imponible</td>
                <td><?= number_format($baseImponible,2) ?> €</td>
            </tr>
            <tr>
                <td>IVA</td>
                <td><?= number_format($iva,2) ?> €</td>
            </tr>
            <tr>
                <td>Total</td>
                <td class="total"><?= number_format($total,2) ?> €</td>
            </tr>
        </table>
        <h2>Datos de entrega</h2>
        <form method="post" action="confirmar-pedido.php">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" value="<?= $cliente ?>">

            <label for="<?= $tipoDocumento ?>"><?= ucfirst($tipoDocumento) ?></label>
            <input type="text" id="<?= $tipoDocumento ?>" name="<?= $tipoDocumento ?>" value="<?= $idDocumento ?>">

            <input type="checkbox" id="urgente" name="urgente" title="Entrega prioritaria" <?= $envioUrgente ? 'checked' : '' ?>>
            <label for="urgente">Solicito envío urgente</label>

            <label for="direccion">Dirección</label>
            <textarea rows="3" id="direccion" name="direccion"><?= $direccion ?></textarea>

            <label for="observaciones">Observaciones</label>
            <textarea rows="4" id="observaciones" name="observaciones"><?= $observaciones ?></textarea>

<!--             <input type="submit" value="Confirmar pedido">
            <input type="submit" value="Modificar pedido"> -->

            <button type="submit" formaction="modificar-pedido.php">Modificar datos</button>
            <button type="submit">Confirmar pedido</button>
        </form>
    </div>
</body>
</html>
