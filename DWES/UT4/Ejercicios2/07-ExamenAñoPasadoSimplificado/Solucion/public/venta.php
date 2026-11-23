<?php

require_once "../App/Clases/ConexionBD.php";

require_once "../App/Clases/FactoriaAplicacion.php";

require_once "../App/Clases/entidades/Pelicula.php";

require_once "../App/Clases/dao/PeliculaDAO.php";
require_once "../App/Clases/dao/PeliculaPDODAO.php";
require_once "../App/Clases/dao/PeliculaDAOLog.php";

require_once "../App/Clases/services/PeliculaService.php";

$factoria =
    new FactoriaAplicacion();

$service =
    $factoria->crearPeliculaService();

$peliculas =
    $service->obtenerTodas();

/*********************
 * SOLO CON STOCK
 *********************/

$peliculasDisponibles =
    [];

foreach (
    $peliculas
    as $pelicula
) {

    if (
        $pelicula
        ->entradasDisponibles > 0
    ) {

        $peliculasDisponibles[] =
            $pelicula;
    }
}

$mensaje = "";

if (
    isset($_POST["comprar"])
) {

    try {

        $service->venderEntradas(
            (int)
            $_POST["pelicula"],

            $_POST["comprador"],

            (int)
            $_POST["cantidad"]
        );

        $mensaje =
            "Venta realizada correctamente";

        $peliculas =
            $service
                ->obtenerTodas();

        $peliculasDisponibles =
            [];

        foreach (
            $peliculas
            as $pelicula
        ) {

            if (
                $pelicula
                ->entradasDisponibles
                > 0
            ) {

                $peliculasDisponibles[] =
                    $pelicula;
            }
        }

    } catch (
        Exception $e
    ) {

        $mensaje =
            $e->getMessage();
    }
}

?>

<!doctype html>
<html lang="es">

<head>

<meta charset="utf-8">

<title>Venta</title>

</head>

<body>

<h1>Venta de Entradas</h1>

<p>

    <a href="index.php">

        Volver

    </a>

</p>

<?php if($mensaje !== ""): ?>

<p>

<b>

<?= $mensaje ?>

</b>

</p>

<?php endif; ?>

<form method="post">

<p>

Nombre comprador:

<input
    type="text"
    name="comprador"
    required>

</p>

<p>

Película:

<select
    name="pelicula">

<?php foreach(
    $peliculasDisponibles
    as $pelicula
): ?>

<option
    value="<?= $pelicula->id ?>">

<?= $pelicula->titulo ?>

-

<?= $pelicula->entradasDisponibles ?>

entradas disponibles

</option>

<?php endforeach; ?>

</select>

</p>

<p>

Cantidad:

<input
    type="number"
    name="cantidad"
    min="1"
    required>

</p>

<button
    type="submit"
    name="comprar">

    Comprar

</button>

</form>

<hr>

<h2>Películas disponibles</h2>

<table border="1">

<tr>

<th>ID</th>

<th>Título</th>

<th>Precio</th>

<th>Entradas</th>

</tr>

<?php foreach(
    $peliculasDisponibles
    as $pelicula
): ?>

<tr>

<td>

<?= $pelicula->id ?>

</td>

<td>

<?= htmlspecialchars(
    $pelicula->titulo
) ?>

</td>

<td>

<?= $pelicula->precio ?>

€

</td>

<td>

<?= $pelicula
        ->entradasDisponibles ?>

</td>

</tr>

<?php endforeach; ?>

</table>

</body>

</html>