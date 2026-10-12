<?php
require_once 'logica.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Actividades</title>
    <link rel="stylesheet" href="estilos.css">
</head>

<body>
    <div class="container">
        <h1>Catálogo de actividades</h1>

        <!-- Tabla de actividades -->
        <?php include 'TablaActividades.php'; ?>

        <!-- Estadísticas -->
        <?php include 'SeccionEstadisticas.php'; ?>

        <!-- Avisos -->
        <?php include 'SeccionAvisos.php'; ?>
    </div>
</body>

</html>
