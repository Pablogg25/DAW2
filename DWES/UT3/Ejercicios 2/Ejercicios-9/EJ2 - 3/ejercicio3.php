<?php

declare(strict_types=1);

/*
  Ejercicio 3: Extensión del buscador de películas.
  - Añadimos un array con imágenes (pueden ser rutas locales).
  - Mostramos también el número de películas encontradas.
*/

$peliculas = [
    "El espíritu de la colmena" => [
        "año" => 1973,
        "sinopsis" => "Una niña en la posguerra española queda fascinada por la película 'Frankenstein' y vive entre realidad y fantasía."
    ],
    "Volver" => [
        "año" => 2006,
        "sinopsis" => "Drama de Pedro Almodóvar sobre la familia, los secretos y la supervivencia de varias mujeres en La Mancha."
    ],
    "Tristana" => [
        "año" => 1970,
        "sinopsis" => "Relación compleja entre una joven huérfana y su tutor; retrato de poder y dependencia."
    ],
    "La vaquilla" => [
        "año" => 1985,
        "sinopsis" => "Comedia satírica sobre la Guerra Civil española: un grupo intenta robar una vaca utilizada en una fiesta franquista."
    ],
    "Los otros" => [
        "año" => 2001,
        "sinopsis" => "Thriller gótico sobre una mujer y sus hijos fotosensibles que viven en una mansión aislada con secretos inquietantes."
    ],
    "El laberinto del fauno" => [
        "año" => 2006,
        "sinopsis" => "Fábula oscura ambientada en la posguerra: una niña encuentra un mundo fantástico mientras su madre sufre con la brutalidad del régimen."
    ],
    "Mar adentro" => [
        "año" => 2004,
        "sinopsis" => "Historia real de Ramón Sampedro, un hombre tetrapléjico que luchó por su derecho a morir dignamente."
    ],
    "Ocho apellidos vascos" => [
        "año" => 2014,
        "sinopsis" => "Comedia romántica sobre los choques culturales entre un sevillano y una joven vasca."
    ],
    "La lengua de las mariposas" => [
        "año" => 1999,
        "sinopsis" => "Relato tierno y amargo sobre la amistad entre un niño y su maestro en la víspera de la Guerra Civil."
    ],
    "Tesis" => [
        "año" => 1996,
        "sinopsis" => "Suspense universitario sobre una estudiante que investiga la morbosa fascinación por las imágenes violentas."
    ],
    "Celda 211" => [
        "año" => 2009,
        "sinopsis" => "Un guardia de prisiones se ve atrapado en un motín y debe hacerse pasar por reo para sobrevivir."
    ],
    "La piel que habito" => [
        "año" => 2011,
        "sinopsis" => "Thriller psicológico de Pedro Almodóvar sobre venganza y ética científica."
    ],
];

$imagenes = [
    "El espíritu de la colmena" => "Resources/el_espiritu_de_la_colmena.jpg",
    "Volver" => "Resources/volver.jpg",
    "Tristana" => "Resources/tristana.jpg",
    "La vaquilla" => "Resources/la_vaquilla.jpg",
    "Los otros" => "Resources/los_otros_the_others.jpg",
    "El laberinto del fauno" => "Resources/el_laberinto_del_fauno.jpg",
    "Mar adentro" => "Resources/mar_adentro.jpg",
    "Ocho apellidos vascos" => "Resources/ochoapellidos.jpg",
    "La lengua de las mariposas" => "Resources/la_lengua_de_las_mariposas.jpg",
    "Tesis" => "Resources/tesis.jpg",
    "Celda 211" => "Resources/celda_211.jpg",
    "La piel que habito" => "Resources/la_piel_que_habito.jpg",
];

$resultados = [];
$busqueda = $_POST['busqueda'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $busqueda !== '') {
    foreach ($peliculas as $titulo => $info) {
        if (strpos($titulo, $busqueda) !== false) {
            $resultados[$titulo] = $info;
        }
    }
}
?>
<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>Ejercicio 3 - Buscador con imágenes</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 700px
        }

        .resultado {
            margin-top: 20px;
            padding: 12px;
            background: #f4f4f4;
            border: 1px solid #ddd
        }

        img {
            max-width: 150px;
            display: block;
            margin-top: 10px
        }
    </style>
</head>

<body>
    <h1>Buscador de películas con imágenes</h1>

    <form method="post" action="<?= htmlspecialchars($_SERVER['PHP_SELF']) ?>">
        <label>
            Buscar por título:
            <input type="text" name="busqueda" value="<?= htmlspecialchars($busqueda) ?>" />
        </label>
        <button type="submit">Buscar</button>
    </form>

    <?php if ($busqueda !== ''): ?>
        <h2>Resultados de la búsqueda:</h2>
        <p>Se encontraron <?= count($resultados) ?> película(s).</p>
        <?php if ($resultados): ?>
            <?php foreach ($resultados as $titulo => $info): ?>
                <div class="resultado">
                    <strong><?= htmlspecialchars($titulo) ?></strong> (<?= $info['año'] ?>)<br>
                    <?= htmlspecialchars($info['sinopsis']) ?><br>
                    <?php if (isset($imagenes[$titulo])): ?>
                        <img src="<?= htmlspecialchars($imagenes[$titulo]) ?>" alt="<?= htmlspecialchars($titulo) ?>">
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>No se encontraron películas con ese título.</p>
        <?php endif; ?>
    <?php endif; ?>
</body>

</html>