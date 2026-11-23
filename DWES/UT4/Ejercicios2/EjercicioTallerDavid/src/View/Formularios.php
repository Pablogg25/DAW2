<?php declare(strict_types=1); ?>

<?php if ($op === 'add_cliente'): ?>
    <h2>Añadir Cliente</h2>
    <form method="POST" action="index.php?op=add_cliente">
        <input type="hidden" name="accion" value="add_cliente">
        <p><label>NIF: <input type="text" name="nif" required></label></p>
        <p><label>Nombre Completo: <input type="text" name="nombre" required></label></p>
        <button type="submit">Guardar Cliente</button>
    </form>

<?php elseif ($op === 'add_coche'): ?>
    <h2>Añadir Coche</h2>
    <form method="POST" action="index.php?op=add_coche">
        <input type="hidden" name="accion" value="add_coche">
        <p><label>Matrícula: <input type="text" name="matricula" required></label></p>
        <p><label>Marca: <input type="text" name="marca" required></label></p>
        <p><label>Modelo: <input type="text" name="modelo" required></label></p>
        <p><label>Cliente Propietario:
            <select name="nif_cliente" required>
                <option value="">-- Seleccionar Cliente --</option>
                <?php foreach ($taller->getClientes() as $c): ?>
                    <option value="<?= Helper::e($c->getNif()) ?>"><?= Helper::e($c->getNombre()) ?> (<?= Helper::e($c->getNif()) ?>)</option>
                <?php endforeach; ?>
            </select>
        </label></p>
        <button type="submit">Guardar Coche</button>
    </form>

<?php elseif ($op === 'add_averia'): ?>
    <h2>Añadir Avería</h2>
    <form method="POST" action="index.php?op=add_averia">
        <input type="hidden" name="accion" value="add_averia">
        <p><label>Coche:
            <select name="matricula" required>
                <option value="">-- Seleccionar Coche --</option>
                <?php foreach ($taller->getCoches() as $c): ?>
                    <option value="<?= Helper::e($c->getMatricula()) ?>"><?= Helper::e($c->getMatricula()) ?> - <?= Helper::e($c->getMarca()) ?> <?= Helper::e($c->getModelo()) ?></option>
                <?php endforeach; ?>
            </select>
        </label></p>
        <p><label>Descripción de la avería:<br>
            <textarea name="averia" rows="3" cols="40" required></textarea>
        </label></p>
        <button type="submit">Registrar Avería</button>
    </form>

<?php elseif ($op === 'reparar_coche'): ?>
    <h2>Reparar Coche</h2>
    <form method="POST" action="index.php?op=reparar_coche">
        <input type="hidden" name="accion" value="reparar_coche">
        <p><label>Avería pendiente:
            <select name="id_reparacion" required>
                <option value="">-- Seleccionar Avería --</option>
                <?php foreach ($taller->getReparaciones() as $r): ?>
                    <?php if (!$r->isReparado()): ?>
                        <option value="<?= $r->getId() ?>">#<?= $r->getId() ?> - Coche: <?= Helper::e($r->getMatriculaCoche()) ?> (<?= Helper::e($r->getAveria()) ?>)</option>
                    <?php endif; ?>
                <?php endforeach; ?>
            </select>
        </label></p>
        <p><label>Reparaciones realizadas:<br>
            <textarea name="trabajo" rows="3" cols="40" required></textarea>
        </label></p>
        <p><label>Precio total (€): <input type="number" step="0.01" name="precio" required></label></p>
        <button type="submit">Finalizar Reparación</button>
    </form>
<?php endif; ?>