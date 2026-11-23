<?php

require_once __DIR__ . "/../App/Clases/ConexionBD.php";

require_once __DIR__ . "/../App/Clases/FactoriaAplicacion.php";

require_once __DIR__ . "/../App/Clases/entidades/Pelicula.php";

require_once __DIR__ . "/../App/Clases/dao/PeliculaDAO.php";
require_once __DIR__ . "/../App/Clases/dao/PeliculaPDODAO.php";
require_once __DIR__ . "/../App/Clases/dao/PeliculaDAOLog.php";

require_once __DIR__ . "/../App/Clases/services/PeliculaService.php";

$factoria =
    new FactoriaAplicacion();

$service =
    $factoria->crearPeliculaService();

/*****************
 * CREATE
 *****************/

if (isset($_POST["crear"])) {

    $pelicula =
        new Pelicula(
            0,
            $_POST["titulo"],
            (float)$_POST["precio"],
            (int)$_POST["entradas"]
        );

    $service->crear(
        $pelicula
    );

    header(
        "Location: peliculas.php"
    );

    exit();
}

/*****************
 * UPDATE
 *****************/

if (
    isset($_POST["actualizar"])
) {

    $pelicula =
        new Pelicula(
            (int)$_POST["id"],
            $_POST["titulo"],
            (float)$_POST["precio"],
            (int)$_POST["entradas"]
        );

    $service->actualizar(
        $pelicula
    );

    header(
        "Location: peliculas.php"
    );

    exit();
}

/*****************
 * DELETE
 *****************/

if (
    isset($_POST["borrar"])
) {

    $service->borrar(
        (int)$_POST["id"]
    );

    header(
        "Location: peliculas.php"
    );

    exit();
}

/*****************
 * READ
 *****************/

$peliculas =
    $service->obtenerTodas();

?>

<!doctype html>
<html lang="es">

<head>

<meta charset="utf-8">

<title>Películas</title>

</head>

<body>

<h1>Gestión de Películas</h1>

<p>

    <a href="index.php">

        Volver

    </a>

</p>

<h2>Nueva película</h2>

<form method="post">

    <p>

        Título:

        <input
            type="text"
            name="titulo"
            required>

    </p>

    <p>

        Precio:

        <input
            type="number"
            step="0.01"
            name="precio"
            required>

    </p>

    <p>

        Entradas disponibles:

        <input
            type="number"
            name="entradas"
            min="0"
            required>

    </p>

    <button
        type="submit"
        name="crear">

        Crear

    </button>

</form>

<hr>

<table border="1">

<tr>

    <th>ID</th>

    <th>Título</th>

    <th>Precio</th>

    <th>Entradas</th>

    <th>Acciones</th>

</tr>

<?php foreach($peliculas as $pelicula): ?>

<tr>

<form method="post">

<td>

<?= $pelicula->id ?>

<input
    type="hidden"
    name="id"
    value="<?= $pelicula->id ?>">

</td>

<td>

<input
    type="text"
    name="titulo"
    value="<?= htmlspecialchars($pelicula->titulo) ?>">

</td>

<td>

<input
    type="number"
    step="0.01"
    name="precio"
    value="<?= $pelicula->precio ?>">

</td>

<td>

<input
    type="number"
    name="entradas"
    value="<?= $pelicula->entradasDisponibles ?>">

</td>

<td>

<button
    name="actualizar">

    Actualizar

</button>

<button
    name="borrar">

    Borrar

</button>

</td>

</form>

</tr>

<?php endforeach; ?>

</table>

</body>

</html>