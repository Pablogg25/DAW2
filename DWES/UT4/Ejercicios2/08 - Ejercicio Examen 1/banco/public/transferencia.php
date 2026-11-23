<?php
require_once __DIR__ . '/../App/Clases/FactoriaAplicacion.php';

$error = '';
$mensaje = isset($_GET['ok']) ? 'Transferencia realizada correctamente.' : '';
$cuentasOrigen = [];
$cuentasDestino = [];

try {
    $factoria = new FactoriaAplicacion();
    $servicio = $factoria->crearCuentaService();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $origenId = filter_var($_POST['origen_id'] ?? '', FILTER_VALIDATE_INT);
        $destinoId = filter_var($_POST['destino_id'] ?? '', FILTER_VALIDATE_INT);
        $importeRaw = str_replace(',', '.', trim((string) ($_POST['importe'] ?? '')));
        $importe = filter_var($importeRaw, FILTER_VALIDATE_FLOAT);

        if ($origenId === false || $destinoId === false || $importe === false) {
            throw new InvalidArgumentException('Selecciona cuentas válidas e introduce un importe numérico.');
        }

        $servicio->transferir($origenId, $destinoId, $importe);
        header('Location: transferencia.php?ok=1');
        exit;
    }

    $cuentasOrigen = $servicio->listarActivasConSaldo();
    $cuentasDestino = $servicio->listarActivas();
} catch (PDOException $e) {
    error_log($e->getMessage());
    $error = 'No se pudo completar la transferencia en la base de datos.';
} catch (Exception $e) {
    $error = $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Groucho Bank - Transferencias</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 750px; margin: 30px auto; padding: 0 15px; }
        nav { margin-bottom: 20px; }
        nav a { margin-right: 15px; color: #1d3557; text-decoration: none; font-weight: bold; }
        .error { background: #f8d7da; color: #721c24; padding: 10px; margin-bottom: 15px; border: 1px solid #f5c6cb; }
        .ok { background: #d4edda; color: #155724; padding: 10px; margin-bottom: 15px; border: 1px solid #c3e6cb; }
        form.caja { background: #f4f4f4; padding: 20px; border: 1px solid #ddd; }
        select, input { width: 100%; max-width: 550px; padding: 6px; }
    </style>
</head>
<body>

    <nav>
        <a href="index.php">Inicio</a>
        <a href="cuentas.php">Gestión de Cuentas</a>
        <a href="transferencia.php">Transferencias</a>
    </nav>

    <h1>Realizar Transferencia</h1>

    <?php if ($error !== ''): ?>
        <div class="error"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div>
    <?php endif; ?>

    <?php if ($mensaje !== ''): ?>
        <div class="ok"><?= htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8') ?></div>
    <?php endif; ?>

    <form class="caja" method="post" action="transferencia.php">
        <p>
            <label>Cuenta origen (ACTIVA con saldo &gt; 0):<br>
                <select name="origen_id" required>
                    <option value="">-- Selecciona cuenta origen --</option>
                    <?php foreach ($cuentasOrigen as $c): ?>
                        <option value="<?= htmlspecialchars((string) $c->id, ENT_QUOTES, 'UTF-8') ?>"
                            <?= (isset($_POST['origen_id']) && (int) $_POST['origen_id'] === $c->id) ? 'selected' : '' ?>>
                            <?= htmlspecialchars($c->titular, ENT_QUOTES, 'UTF-8') ?> - <?= htmlspecialchars($c->iban, ENT_QUOTES, 'UTF-8') ?> (<?= number_format($c->saldo, 2, ',', '.') ?> €)
                        </option>
                    <?php endforeach; ?>
                </select>
            </label>
        </p>

        <p>
            <label>Cuenta destino (ACTIVA):<br>
                <select name="destino_id" required>
                    <option value="">-- Selecciona cuenta destino --</option>
                    <?php foreach ($cuentasDestino as $c): ?>
                        <option value="<?= htmlspecialchars((string) $c->id, ENT_QUOTES, 'UTF-8') ?>"
                            <?= (isset($_POST['destino_id']) && (int) $_POST['destino_id'] === $c->id) ? 'selected' : '' ?>>
                            <?= htmlspecialchars($c->titular, ENT_QUOTES, 'UTF-8') ?> - <?= htmlspecialchars($c->iban, ENT_QUOTES, 'UTF-8') ?> (<?= number_format($c->saldo, 2, ',', '.') ?> €)
                        </option>
                    <?php endforeach; ?>
                </select>
            </label>
        </p>

        <p>
            <label>Importe (€):<br>
                <input type="number" name="importe" step="0.01" min="0.01" required value="<?= htmlspecialchars((string) ($_POST['importe'] ?? ''), ENT_QUOTES, 'UTF-8') ?>">
            </label>
        </p>

        <button type="submit">Transferir</button>
    </form>

</body>
</html>