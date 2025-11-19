<?php
// Array multidimensional con la información de las bandas
$bandas = [
    "U2" => [
        "vocalista" => ["nombre" => "Bono", "imagen" => "imagenes/bono.jpg"],
        "musicos" => [
            ["nombre" => "The Edge", "instrumento" => "guitarra", "imagen" => "imagenes/the_edge.jpg"],
            ["nombre" => "Adam Clayton", "instrumento" => "bajo", "imagen" => "imagenes/adam_clayton.jpg"],
            ["nombre" => "Larry Mullen Jr.", "instrumento" => "batería", "imagen" => "imagenes/larry_mullen.jpg"]
        ],
        "imagen_banda" => "imagenes/u2.jpg"
    ],
    "Led Zeppelin" => [
        "vocalista" => ["nombre" => "Robert Plant", "imagen" => "imagenes/robert_plant.jpg"],
        "musicos" => [
            ["nombre" => "Jimmy Page", "instrumento" => "guitarra", "imagen" => "imagenes/jimmy_page.jpg"],
            ["nombre" => "John Paul Jones", "instrumento" => "bajo", "imagen" => "imagenes/john_paul_jones.jpg"],
            ["nombre" => "John Bonham", "instrumento" => "batería", "imagen" => "imagenes/john_bonham.jpg"]
        ],
        "imagen_banda" => "imagenes/led_zeppelin.jpg"
    ],
    "Metallica" => [
        "vocalista" => ["nombre" => "James Hetfield", "instrumento" => "guitarra rítmica", "imagen" => "imagenes/james_hetfield.jpg"],
        "musicos" => [
            ["nombre" => "Lars Ulrich", "instrumento" => "batería", "imagen" => "imagenes/lars_ulrich.jpg"],
            ["nombre" => "Kirk Hammett", "instrumento" => "guitarra solista", "imagen" => "imagenes/kirk_hammett.jpg"],
            ["nombre" => "Robert Trujillo", "instrumento" => "bajo", "imagen" => "imagenes/robert_trujillo.jpg"]
        ],
        "imagen_banda" => "imagenes/metallica.jpg"
    ],
    "AC/DC" => [
        "vocalista" => ["nombre" => "Brian Johnson", "imagen" => "imagenes/brian_johnson.jpg"],
        "musicos" => [
            ["nombre" => "Angus Young", "instrumento" => "guitarra solista", "imagen" => "imagenes/angus_young.jpg"],
            ["nombre" => "Stevie Young", "instrumento" => "guitarra rítmica", "imagen" => "imagenes/stevie_young.jpg"],
            ["nombre" => "Cliff Williams", "instrumento" => "bajo", "imagen" => "imagenes/cliff_williams.jpg"],
            ["nombre" => "Phil Rudd", "instrumento" => "batería", "imagen" => "imagenes/phil_rudd.jpg"]
        ],
        "imagen_banda" => "imagenes/acdc.jpg"
    ],
    "Queen" => [
        "vocalista" => ["nombre" => "Freddie Mercury", "imagen" => "imagenes/freddie_mercury.jpg"],
        "musicos" => [
            ["nombre" => "Brian May", "imagen" => "imagenes/brian_may.jpg"],
            ["nombre" => "John Deacon", "imagen" => "imagenes/john_deacon.jpg"],
            ["nombre" => "Roger Taylor", "imagen" => "imagenes/roger_taylor.jpg"]
        ],
        "imagen_banda" => "imagenes/queen.jpg"
    ],
    "The Beatles" => [
        "vocalista" => ["nombre" => "John Lennon", "imagen" => "imagenes/john_lennon.jpg"],
        "musicos" => [
            ["nombre" => "Paul McCartney", "imagen" => "imagenes/paul_mccartney.jpg"],
            ["nombre" => "George Harrison", "imagen" => "imagenes/george_harrison.jpg"],
            ["nombre" => "Ringo Starr", "imagen" => "imagenes/ringo_starr.jpg"]
        ],
        "imagen_banda" => "imagenes/beatles.jpg"
    ]
];

$bandaSeleccionada = $_POST['banda'] ?? null;
$componente = $_POST['componente'] ?? null;
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Bandas legendarias de rock</title>
</head>

<body>
    <h2>Selecciona una banda y el tipo de componente</h2>
    <form method="post">
        <label for="banda">Banda:</label>
        <select name="banda" id="banda">
            <option value="">-- Todas las bandas --</option>
            <?php
            foreach ($bandas as $banda => $info) {
                $selected = ($banda === $bandaSeleccionada) ? "selected" : "";
                echo "<option value='$banda' $selected>$banda</option>";
            }
            ?>
        </select>
        <br><br>
        <label>Componente:</label>
        <input type="radio" name="componente" value="vocalista" <?php if ($componente === "vocalista") echo "checked"; ?>> Vocalista
        <input type="radio" name="componente" value="musicos" <?php if ($componente === "musicos") echo "checked"; ?>> Músicos
        <br><br>
        <input type="submit" value="Mostrar">
    </form>

    <hr>

    <?php

    function mostrarBanda($nombre, $datos, $tipoComponente)
    {
        echo "<h3>$nombre</h3>";
        if ($tipoComponente === "vocalista") {
            echo "<p><strong>Vocalista:</strong> {$datos['vocalista']['nombre']}</p>";
            echo "<img src='{$datos['vocalista']['imagen']}' alt='{$datos['vocalista']['nombre']}' width='150'><br>";
        } elseif ($tipoComponente === "musicos") {
            echo "<p><strong>Músicos:</strong></p><ul>";
            foreach ($datos['musicos'] as $musico) {
                echo "<li>{$musico['nombre']}";
                if (isset($musico['instrumento'])) echo " ({$musico['instrumento']})";
                echo "</li>";
                echo "<img src='{$musico['imagen']}' alt='{$musico['nombre']}' width='100'>";
            }
            echo "</ul>";
        }
    }
    // Mostrar la información según la selección
    if ($bandaSeleccionada && $componente) {
        mostrarBanda($bandaSeleccionada, $bandas[$bandaSeleccionada], $componente);
    } elseif (!$bandaSeleccionada && $componente) {
        foreach ($bandas as $nombre => $datos) {
            mostrarBanda($nombre, $datos, $componente);
            echo "<hr>";
        }
    } elseif ($bandaSeleccionada && !$componente) {
        echo "<p>Por favor, selecciona el tipo de componente (Vocalista o Músicos).</p>";
    } elseif (!$bandaSeleccionada && !$componente) {
        echo "<p>Selecciona una banda y el tipo de componente para mostrar información.</p>";
    }
    ?>
</body>

</html>