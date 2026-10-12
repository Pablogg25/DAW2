<?php
    require_once 'logica.php';
?>
<table>
    <tr>
        <th>Nombre</th>
        <th>Plazas</th>
        <th>Inscritos</th>
        <th>Disponibles</th>
        <th>Estado</th>
        <th>Recaudación (€)</th>
        <th>% Ocupación</th>
    </tr>

    <?php foreach ($filas as $fila): ?>
        <tr class="<?= e($fila['estado']['clase']) ?>">
            <td><?= e($fila['nombre']) ?></td>
            <td><?= e($fila['plazas']) ?></td>
            <td><?= e($fila['inscritos']) ?></td>
            <td><?= e($fila['disponibles']) ?></td>
            <td><?= e($fila['estado']['estado']) ?></td>
            <td><?= e($fila['recaudacion']) ?></td>
            <td><?= e($fila['ocupacion']) ?>%</td>
        </tr>
    <?php endforeach; ?>
</table>