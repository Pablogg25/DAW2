<?php require_once 'logica.php'; ?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Agencia de Viajes</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 900px;
            margin: auto;
        }

        .error {
            color: #c00;
            background: #fee;
            padding: 10px;
            border: 1px solid #c00;
        }

        .exito {
            color: #070;
            background: #efe;
            padding: 10px;
            border: 1px solid #070;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: center;
        }

        th {
            background: #333;
            color: white;
        }

        .agotado {
            background-color: #ffcccc;
        }

        .ultimas {
            background-color: #fff3bf;
        }

        .disponible {
            background-color: #d4edda;
        }

        form {
            background: #f4f4f4;
            padding: 15px;
            border: 1px solid #ddd;
            margin-bottom: 20px;
        }
    </style>
</head>

<body>
    <h1>Reserva tu viaje</h1>

    <!-- Mensajes de feedback -->
    <?php if (!empty($errores)): ?>
        <div class="error">
            <ul>
                <?php foreach ($errores as $err): ?>
                    <li><?= e($err) ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php elseif ($mensajeExito): ?>
        <div class="exito"><?= e($mensajeExito) ?></div>
    <?php endif; ?>

    <!-- Formulario -->
    <form action="<?= e($_SERVER['PHP_SELF']) ?>" method="POST">
        <p>
            <label>Destino:
                <select name="destino" required>
                    <option value="">Selecciona un destino...</option>
                    <?php foreach ($viajes as $clave => $datos): ?>
                        <option value="<?= e($clave) ?>"><?= e($datos['nombre']) ?> (<?= e($datos['precio']) ?> €)</option>
                    <?php endforeach; ?>
                </select>
            </label>
        </p>
        <p>
            <label>Número de billetes:
                <input type="number" name="billetes" min="1" required>
            </label>
        </p>
        <p>
            <label>Email de contacto:
                <input type="email" name="email" required>
            </label>
        </p>
        <button type="submit">Confirmar Reserva</button>
    </form>

    <!-- Tabla dinámica -->
    <h2>Estado de los Viajes</h2>
    <table>
        <tr>
            <th>Nombre</th>
            <th>Plazas Libres</th>
            <th>Estado</th>
            <th>Recaudación Parcial</th>
        </tr>
        <?php
        $recaudacionTotal = 0;
        foreach ($viajes as $viaje):
            $libres = calcularDisponibles($viaje);
            $clase = obtenerClaseEstado($libres);
            $estadoTexto = strtoupper($clase);
            $recaudacion = $viaje['plazas_reservadas'] * $viaje['precio'];

            $recaudacionTotal += $recaudacion;
        ?>
            <tr class="<?= $clase ?>">
                <td><?= e($viaje['nombre']) ?></td>
                <td><?= $libres ?></td>
                <td><?= e($estadoTexto) ?></td>
                <td><?= e(number_format($recaudacion, 2, ',', '.')) ?> €</td>
            </tr>
        <?php endforeach; ?>
    </table>

    <!-- Estadísticas calculadas al vuelo -->
    <h3>Estadísticas Globales</h3>
    <ul>
        <li><strong>Recaudación Total:</strong> <?= e(number_format($recaudacionTotal, 2, ',', '.')) ?> €</li>
    </ul>
</body>

</html>