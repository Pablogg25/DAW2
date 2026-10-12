<?php
$actividades = [
    ["nombre" => "Robótica", "plazas" => 20, "inscritos" => 18, "precio" => 25],
    ["nombre" => "Impresión 3D", "plazas" => 15, "inscritos" => 15, "precio" => 30],
    ["nombre" => "Diseño Web", "plazas" => 25, "inscritos" => 12, "precio" => 20],
    ["nombre" => "Videojuegos", "plazas" => 18, "inscritos" => 17, "precio" => 35]
];

$totalActividades = count($actividades);
$totalPlazas = 0;
$totalInscritos = 0;
$recaudacionTotal = 0;
$masDemandada = '';
$maxInscritos = -1;
$masLibre = '';
$maxLibres = -1;
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Actividades</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 30px;
            background: #f4f4f4
        }

        .container {
            max-width: 1100px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px
        }

        table {
            width: 100%;
            border-collapse: collapse
        }

        th,
        td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: center
        }

        th {
            background: #333;
            color: white
        }

        .completa {
            background: #ffcccc
        }

        .ultimas {
            background: #fff3bf
        }

        .disponible {
            background: #d4edda
        }

        section {
            margin-top: 25px
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Catálogo de actividades</h1>
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
            <?php foreach ($actividades as $a):
                $disp = $a['plazas'] - $a['inscritos'];
                if ($disp == 0) {
                    $estado = 'COMPLETA';
                    $clase = 'completa';
                } elseif ($disp <= 3) {
                    $estado = 'ÚLTIMAS PLAZAS';
                    $clase = 'ultimas';
                } else {
                    $estado = 'DISPONIBLE';
                    $clase = 'disponible';
                }
                $recaudacion = $a['inscritos'] * $a['precio'];
                $ocupacion = round(($a['inscritos'] * 100) / $a['plazas'], 2);
                $totalPlazas += $a['plazas'];
                $totalInscritos += $a['inscritos'];
                $recaudacionTotal += $recaudacion;
                if ($a['inscritos'] > $maxInscritos) {
                    $maxInscritos = $a['inscritos'];
                    $masDemandada = $a['nombre'];
                }
                if ($disp > $maxLibres) {
                    $maxLibres = $disp;
                    $masLibre = $a['nombre'];
                }
            ?>
                <tr class="<?= $clase ?>">
                    <td><?= $a['nombre'] ?></td>
                    <td><?= $a['plazas'] ?></td>
                    <td><?= $a['inscritos'] ?></td>
                    <td><?= $disp ?></td>
                    <td><?= $estado ?></td>
                    <td><?= $recaudacion ?></td>
                    <td><?= $ocupacion ?>%</td>
                </tr>
            <?php endforeach; ?>
        </table>
        <?php $ocupGlobal = round(($totalInscritos * 100) / $totalPlazas, 2); ?>
        <section>
            <h2>Estadísticas</h2>
            <ul>
                <li>Total actividades: <?= $totalActividades ?></li>
                <li>Total plazas: <?= $totalPlazas ?></li>
                <li>Total inscritos: <?= $totalInscritos ?></li>
                <li>Ocupación global: <?= $ocupGlobal ?>%</li>
                <li>Actividad con más inscritos: <?= $masDemandada ?></li>
                <li>Actividad con más plazas libres: <?= $masLibre ?></li>
                <li>Recaudación total: <?= $recaudacionTotal ?> €</li>
            </ul>
        </section>
        <section>
            <h2>Avisos automáticos</h2>
            <ul>
                <?php foreach ($actividades as $a): $disp = $a['plazas'] - $a['inscritos']; ?>
                    <li><?php if ($disp == 0) echo "La actividad {$a['nombre']} ha cerrado inscripciones.";
                        elseif ($disp <= 3) echo "La actividad {$a['nombre']} está casi completa.";
                        else echo "La actividad {$a['nombre']} tiene plazas suficientes.";
                        ?>
                    </li>
                <?php endforeach; ?>
            </ul>
        </section>
    </div>
</body>

</html>