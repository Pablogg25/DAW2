'<?php
    $trayectos = [
        ["Origen" => "Madrid", "Destino" => "Segovia", "Distancia" => 90801],
        ["Origen" => "Madrid", "Destino" => "A Coruña", "Distancia" => 596887],
        ["Origen" => "Barcelona", "Destino" => "Cadiz", "Distancia" => 1152669],
        ["Origen" => "Bilbao", "Destino" => "Valencia", "Distancia" => 622233],
        ["Origen" => "Sevilla", "Destino" => "Santander", "Distancia" => 832067],
        ["Origen" => "Oviedo", "Destino" => "Badajoz", "Distancia" => 682429],
    ];
    // Mostrar la tabla
    echo "<table>";
    echo "<caption>Distancias entre ciudades</caption>";
    echo "<tr><th>Origen</th><th>Destino</th><th>Distancia (m)</th><th>Distancia (km)</th></tr>";

    $distancias = []; // para cálculos posteriores

    foreach ($trayectos as $t) {
        $km = $t["Distancia"] / 1000; // conversión a km
        echo "<tr>";
        echo "<td>{$t['Origen']}</td>";
        echo "<td>{$t['Destino']}</td>";
        echo "<td>{$t['Distancia']}</td>";
        echo "<td>" . number_format($km, 2, ',', '.') . " km</td>";
        echo "</tr>";

        $distancias[] = $t; // guardamos el trayecto
    }

    // Calcular el trayecto más largo
    $maxDistancia = max(array_column($distancias, "Distancia"));
    $trayectoMasLargo = array_filter($distancias, fn($t) => $t["Distancia"] == $maxDistancia);
    $trayectoMasLargo = array_values($trayectoMasLargo)[0]; // obtener el primero

    // Mostrar resultado
    echo "<div class='resultado'>";
    echo "<h3>📏 Trayecto más largo</h3>";
    echo "<p><strong>Origen:</strong> {$trayectoMasLargo['Origen']}</p>";
    echo "<p><strong>Destino:</strong> {$trayectoMasLargo['Destino']}</p>";
    echo "<p><strong>Distancia:</strong> " . number_format($trayectoMasLargo['Distancia'] / 1000, 2, ',', '.') . " km</p>";
    echo "</div>";
    ?>