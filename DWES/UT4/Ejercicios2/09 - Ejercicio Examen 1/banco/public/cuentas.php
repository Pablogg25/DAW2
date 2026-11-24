<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require_once __DIR__ . '/../App/Clases/FactoriaAplicacion.php';

$error = '';
$mensaje = match ($_GET['ok'] ?? '') {
    'alta' => 'Cuenta creada correctamente.',
    'modificacion' => 'Cuenta modificada correctamente.',
    'borrado' => 'Cuenta eliminada correctamente.',
    default => ''
};
$cuentas = [];
$cuentaEditar = null;

try {
    $factoria = new FactoriaAplicacion();
    $servicio = $factoria->crearCuentaService();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $accion = $_POST['accion'] ?? '';

        if ($accion === 'crear') {
            $iban = (string) ($_POST['iban'] ?? '');
            $titular = (string) ($_POST['titular'] ?? '');
            $saldoRaw = str_replace(',', '.', trim((string) ($_POST['saldo'] ?? '')));
            $saldo = filter_var($saldoRaw, FILTER_VALIDATE_FLOAT);

            if ($saldo === false) {
                throw new InvalidArgumentException('El saldo inicial debe ser un número válido.');
            }

            $servicio->crearCuenta($iban, $titular, $saldo);
            header('Location: cuentas.php?ok=alta');
            exit;
        }

        if ($accion === 'modificar') {
            $id = filter_var($_POST['id'] ?? '', FILTER_VALIDATE_INT);
            $titular = (string) ($_POST['titular'] ?? '');
            $estado = (string) ($_POST['estado'] ?? '');

            if ($id === false) {
                throw new InvalidArgumentException('ID de cuenta no válido.');
            }

            $servicio->modificarCuenta($id, $titular, $estado);
            header('Location: cuentas.php?ok=modificacion');
            exit;
        }

        if ($accion === 'borrar') {
            $id = filter_var($_POST['id'] ?? '', FILTER_VALIDATE_INT);
            if ($id === false) {
                throw new InvalidArgumentException('ID de cuenta no válido.');
            }

            $servicio->eliminarCuenta($id);
            header('Location: cuentas.php?ok=borrado');
            exit;
        }
    }

    if (isset($_GET['editar'])) {
        $idEditar = filter_var($_GET['editar'], FILTER_VALIDATE_INT);
        if ($idEditar !== false) {
            $cuentaEditar = $servicio->buscarPorId($idEditar);
        }
    }

    $cuentas = $servicio->listarTodas();
} catch (PDOException $e) {
    error_log($e->getMessage());
    $error = 'Error interno al acceder a la base de datos.';
} catch (Exception $e) {
    $error = $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Groucho Bank - Gestión de Cuentas</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 950px; margin: 30px auto; padding: 0 15px; }
        nav { margin-bottom: 20px; }
        nav a { margin-right: 15px; color: #1d3557; text-decoration: none; font-weight: bold; }
        .error { background: #f8d7da; color: #721c24; padding: 10px; margin-bottom: 15px; border: 1px solid #f5c6cb; }
        .ok { background: #d4edda; color: #155724; padding: 10px; margin-bottom: 15px; border: 1px solid #c3e6cb; }
        form.caja { background: #f4f4f4; padding: 15px; margin-bottom: 20px; border: 1px solid #ddd; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background: #1d3557; color: #fff; }
    </style>
</head>
<body>

    <nav>
        <a href="index.php">Inicio</a>
        <a href="cuentas.php">Gestión de Cuentas</a>
        <a href="transferencia.php">Transferencias</a>
    </nav>

    <h1>Gestión de Cuentas</h1>

    <?php if ($error !== ''): ?>
        <div class="error"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div>
    <?php endif; ?>

    <?php if ($mensaje !== ''): ?>
        <div class="ok"><?= htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8') ?></div>
    <?php endif; ?>

    <h2><?= $cuentaEditar ? 'Modificar cuenta #' . htmlspecialchars((string) $cuentaEditar->id, ENT_QUOTES, 'UTF-8') : 'Nueva cuenta' ?></h2>
    <form class="caja" method="post" action="cuentas.php">
        <input type="hidden" name="accion" value="<?= $cuentaEditar ? 'modificar' : 'crear' ?>">
        <input type="hidden" name="id" value="<?= $cuentaEditar ? htmlspecialchars((string) $cuentaEditar->id, ENT_QUOTES, 'UTF-8') : '' ?>">

        <?php if (!$cuentaEditar): ?>
            <p>
                <label>IBAN (ES + 22 dígitos):<br>
                    <input type="text" name="iban" maxlength="24" required>
                </label>
            </p>
        <?php else: ?>
            <p>
                <strong>IBAN:</strong> <?= htmlspecialchars($cuentaEditar->iban, ENT_QUOTES, 'UTF-8') ?><br>
                <strong>Saldo actual:</strong> <?= number_format($cuentaEditar->saldo, 2, ',', '.') ?> €
            </p>
        <?php endif; ?>

        <p>
            <label>Titular:<br>
                <input type="text" name="titular" maxlength="100" required value="<?= $cuentaEditar ? htmlspecialchars($cuentaEditar->titular, ENT_QUOTES, 'UTF-8') : '' ?>">
            </label>
        </p>

        <?php if (!$cuentaEditar): ?>
            <p>
                <label>Saldo inicial (€):<br>
                    <input type="number" name="saldo" step="0.01" min="0" value="0.00" required>
                </label>
            </p>
        <?php else: ?>
            <p>
                <label>Estado:<br>
                    <select name="estado">
                        <option value="ACTIVA" <?= $cuentaEditar->estado === 'ACTIVA' ? 'selected' : '' ?>>ACTIVA</option>
                        <option value="BLOQUEADA" <?= $cuentaEditar->estado === 'BLOQUEADA' ? 'selected' : '' ?>>BLOQUEADA</option>
                    </select>
                </label>
            </p>
        <?php endif; ?>

        <button type="submit"><?= $cuentaEditar ? 'Guardar cambios' : 'Crear cuenta' ?></button>
        <?php if ($cuentaEditar): ?>
            <a href="cuentas.php">Cancelar</a>
        <?php endif; ?>
    </form>

    <h2>Listado de cuentas</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>IBAN</th>
                <th>Titular</th>
                <th>Saldo</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php if (empty($cuentas)): ?>
                <tr><td colspan="6">No hay cuentas registradas.</td></tr>
            <?php else: ?>
                <?php foreach ($cuentas as $c): ?>
                    <tr>
                        <td><?= htmlspecialchars((string) $c->id, ENT_QUOTES, 'UTF-8') ?></td>
                        <td><?= htmlspecialchars($c->iban, ENT_QUOTES, 'UTF-8') ?></td>
                        <td><?= htmlspecialchars($c->titular, ENT_QUOTES, 'UTF-8') ?></td>
                        <td><?= number_format($c->saldo, 2, ',', '.') ?> €</td>
                        <td><?= htmlspecialchars($c->estado, ENT_QUOTES, 'UTF-8') ?></td>
                        <td>
                            <a href="cuentas.php?editar=<?= htmlspecialchars((string) $c->id, ENT_QUOTES, 'UTF-8') ?>">Editar</a>
                            <form method="post" action="cuentas.php" style="display:inline;" onsubmit="return confirm('¿Eliminar cuenta?');">
                                <input type="hidden" name="accion" value="borrar">
                                <input type="hidden" name="id" value="<?= htmlspecialchars((string) $c->id, ENT_QUOTES, 'UTF-8') ?>">
                                <button type="submit">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php endif; ?>
        </tbody>
    </table>

</body>
</html>