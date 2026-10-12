<?php
    require_once 'logica.php';
?>
<section>
    <h2>Estadísticas</h2>
    <ul>
        <li>Total actividades: <?= e($estadisticas['totalActividades']) ?></li>
        <li>Total plazas: <?= e($estadisticas['totalPlazas']) ?></li>
        <li>Total inscritos: <?= e($estadisticas['totalInscritos']) ?></li>
        <li>Ocupación global: <?= e($estadisticas['ocupacionGlobal']) ?>%</li>
        <li>Actividad con más inscritos: <?= e($estadisticas['masDemandada']) ?></li>
        <li>Actividad con más plazas libres: <?= e($estadisticas['masLibre']) ?></li>
        <li>Recaudación total: <?= e($estadisticas['recaudacionTotal']) ?> €</li>
    </ul>
</section>