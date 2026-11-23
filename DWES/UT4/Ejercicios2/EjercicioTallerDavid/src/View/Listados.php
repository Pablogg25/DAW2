<?php declare(strict_types=1); ?>

<?php if ($op === 'list_coches'): ?>
    <h2>Listado de Coches</h2>
    <table>
        <tr><th>Matrícula</th><th>Marca</th><th>Modelo</th><th>NIF Propietario</th></tr>
        <?php foreach ($taller->getCoches() as $c): ?>
            <tr>
                <td><?= Helper::e($c->getMatricula()) ?></td>
                <td><?= Helper::e($c->getMarca()) ?></td>
                <td><?= Helper::e($c->getModelo()) ?></td>
                <td><?= Helper::e($c->getNifCliente()) ?></td>
            </tr>
        <?php endforeach; ?>
    </table>

<?php elseif ($op === 'list_clientes'): ?>
    <h2>Listado de Clientes y sus Coches</h2>
    <table>
        <tr><th>NIF</th><th>Nombre</th><th>Coches Asociados</th></tr>
        <?php foreach ($taller->getClientes() as $cliente): ?>
            <?php $cochesCliente = $taller->getCochesPorCliente($cliente->getNif()); ?>
            <tr>
                <td><?= Helper::e($cliente->getNif()) ?></td>
                <td><?= Helper::e($cliente->getNombre()) ?></td>
                <td>
                    <?php if (empty($cochesCliente)): ?>
                        <em>Sin coches dados de alta</em>
                    <?php else: ?>
                        <ul>
                            <?php foreach ($cochesCliente as $car): ?>
                                <li><?= Helper::e($car->getMatricula()) ?> - <?= Helper::e($car->getMarca()) ?> <?= Helper::e($car->getModelo()) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>

<?php elseif ($op === 'list_reparaciones'): ?>
    <h2>Historial de Reparaciones</h2>
    <table>
        <tr><th>ID</th><th>Coche</th><th>Avería</th><th>Trabajos Realizados</th><th>Estado</th><th>Precio</th></tr>
        <?php foreach ($taller->getReparaciones() as $r): ?>
            <tr>
                <td>#<?= $r->getId() ?></td>
                <td><?= Helper::e($r->getMatriculaCoche()) ?></td>
                <td><?= Helper::e($r->getAveria()) ?></td>
                <td><?= Helper::e($r->getReparacionesHechas() ?: 'En proceso...') ?></td>
                <td><?= $r->isReparado() ? '<strong style="color:green;">REPARADO</strong>' : '<strong style="color:orange;">PENDIENTE</strong>' ?></td>
                <td><?= $r->isReparado() ? Helper::e(number_format($r->getPrecio(), 2, ',', '.')) . ' €' : '-' ?></td>
            </tr>
        <?php endforeach; ?>
    </table>

<?php elseif ($op === 'list_facturas'): ?>
    <h2>Facturas Emitidas</h2>
    <?php 
    $hayFacturas = false;
    foreach ($taller->getReparaciones() as $r):
        $factura = $taller->imprimirFactura($r);
        if ($factura):
            $hayFacturas = true;
    ?>
        <div class="factura-card">
            <h3>Factura N.º <?= $factura['id'] ?></h3>
            <p><strong>Cliente:</strong> <?= Helper::e($factura['cliente_nombre']) ?> (NIF: <?= Helper::e($factura['cliente_nif']) ?>)</p>
            <p><strong>Vehículo:</strong> <?= Helper::e($factura['coche_marca']) ?> <?= Helper::e($factura['coche_modelo']) ?> [<?= Helper::e($factura['coche_matricula']) ?>]</p>
            <p><strong>Avería inicial:</strong> <?= Helper::e($factura['averia']) ?></p>
            <p><strong>Trabajo realizado:</strong> <?= Helper::e($factura['reparaciones']) ?></p>
            <p class="precio-factura"><strong>IMPORTE TOTAL:</strong> <?= Helper::e(number_format($factura['precio'], 2, ',', '.')) ?> €</p>
        </div>
    <?php 
        endif;
    endforeach; 

    if (!$hayFacturas): ?>
        <p>No se ha generado ninguna factura todavía.</p>
    <?php endif; ?>

    <div class="total-caja">
        Total de Importe Ganado: <span><?= Helper::e(number_format($taller->getTotalGanado(), 2, ',', '.')) ?> €</span>
    </div>
<?php endif; ?>