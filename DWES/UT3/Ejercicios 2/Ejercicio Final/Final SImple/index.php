<?php
// 1. Array de datos (simulando nuestra base de datos)
$viajes = [
    'paris'   => ['nombre' => 'París Romántico', 'plazas_totales' => 20, 'plazas_reservadas' => 18, 'precio' => 150],
    'londres' => ['nombre' => 'Londres Clásico', 'plazas_totales' => 15, 'plazas_reservadas' => 15, 'precio' => 120],
    'roma'    => ['nombre' => 'Roma Antigua',    'plazas_totales' => 30, 'plazas_reservadas' => 10, 'precio' => 95]
];

$mensaje = '';
$recaudacionTotal = 0;

// 2. Comprobar si se ha enviado el formulario
if (isset($_POST['destino']) && isset($_POST['billetes'])) {
    $destino = $_POST['destino'];
    $billetes = (int) $_POST['billetes'];

    // Comprobar que el destino existe en el array y los billetes son válidos
    if (isset($viajes[$destino]) && $billetes > 0) {
        
        $libres = $viajes[$destino]['plazas_totales'] - $viajes[$destino]['plazas_reservadas'];
        
        // Comprobar si hay sitio suficiente
        if ($billetes <= $libres) {
            $viajes[$destino]['plazas_reservadas'] += $billetes; // Sumar la reserva
            $mensaje = "<p style='color:green;'>¡Reserva confirmada de $billetes billete(s) para {$viajes[$destino]['nombre']}!</p>";
        } else {
            $mensaje = "<p style='color:red;'>Error: Solo quedan $libres plazas libres.</p>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reserva de Viajes - Simplificado</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        table { border-collapse: collapse; margin-top: 20px; width: 600px; }
        th, td { border: 1px solid #ccc; padding: 10px; text-align: center; }
        .agotado { background-color: #ffcccc; } 
        .ultimas { background-color: #fff3bf; }
        .disponible { background-color: #d4edda; }
    </style>
</head>
<body>

    <h1>Agencia de Viajes</h1>
    
    <!-- Mostrar mensaje de éxito o error si lo hay -->
    <?= $mensaje ?>

    <!-- 3. Formulario que se envía a la misma página -->
    <form method="POST">
        <label>Destino:</label>
        <select name="destino" required>
            <!-- Generar las opciones dinámicamente -->
            <?php foreach ($viajes as $clave => $datos): ?>
                <option value="<?= $clave ?>"><?= $datos['nombre'] ?> (<?= $datos['precio'] ?> €)</option>
            <?php endforeach; ?>
        </select>
        
        <br><br>
        
        <label>Billetes:</label>
        <input type="number" name="billetes" min="1" required>
        
        <br><br>
        
        <button type="submit">Comprar</button>
    </form>

    <!-- 4. Tabla de resultados -->
    <h2>Estado de los viajes</h2>
    <table>
        <tr>
            <th>Nombre</th>
            <th>Libres</th>
            <th>Estado</th>
            <th>Recaudación</th>
        </tr>
        
        <?php 
        // Bucle para pintar la tabla y calcular totales
        foreach ($viajes as $viaje): 
            $libres = $viaje['plazas_totales'] - $viaje['plazas_reservadas'];
            $recaudacion = $viaje['plazas_reservadas'] * $viaje['precio'];
            $recaudacionTotal += $recaudacion; // Acumular el total global

            // Lógica de colores simple
            if ($libres == 0) {
                $clase = 'agotado';
                $estado = 'AGOTADO';
            } elseif ($libres <= 3) {
                $clase = 'ultimas';
                $estado = 'ÚLTIMAS PLAZAS';
            } else {
                $clase = 'disponible';
                $estado = 'DISPONIBLE';
            }
        ?>
            <tr class="<?= $clase ?>">
                <td><?= $viaje['nombre'] ?></td>
                <td><?= $libres ?></td>
                <td><?= $estado ?></td>
                <td><?= $recaudacion ?> €</td>
            </tr>
        <?php endforeach; ?>
    </table>

    <h3>Recaudación Total: <?= $recaudacionTotal ?> €</h3>

</body>
</html>