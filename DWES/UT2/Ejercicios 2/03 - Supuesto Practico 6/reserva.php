<?php
require "datos.php";

error_reporting(E_ALL & ~E_NOTICE);
ini_set("display_errors", 1);

// Mantener valores tras POST sin if, usando ?? (null coalescing)
$nombre         = $_POST["nombre"]         ?? $nombre;
$email          = $_POST["email"]          ?? $email;
$horas          = $_POST["horas"]          ?? $horas;
$totalDeclarado = $_POST["totalDeclarado"] ?? $totalDeclarado;
$fechaReserva   = $_POST["fechaReserva"]   ?? $fechaReserva;
$comentario     = $_POST["comentario"]     ?? $comentario;

// Validaciones con ternarios
$hoy = date("Y-m-d");

$nombreError =
    strlen(trim($nombre)) === 0
        ? "El nombre es obligatorio."
        : "";

$fechaError =
    (strlen($fechaReserva) === 0)
        ? "La fecha es obligatoria."
        : (
            ($fechaReserva < $hoy)
                ? "La fecha no puede ser anterior a hoy."
                : ""
        );

// Cálculo del total
$totalCalculado = $horas * $precioPorHora;

// Comparación del total declarado
$coincideTotal =
    ($totalDeclarado == $totalCalculado)
        ? "El total declarado coincide."
        : "El total declarado NO coincide.";

// Modo visual y sesión
$claseBody    = $modoOscuro ? "modo-oscuro" : "";
$textoSesion  = $sesionIniciada ? "Sesión iniciada" : "Inicia sesión para reservar";
$menuSesion   = $sesionIniciada ? "Logout" : "Login";
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reserva</title>
    <link rel="stylesheet" href="estilos.css">
</head>

<body class="<?php echo $claseBody; ?>">

<header>
    <div>
        <h1><?php echo $nombreEvento; ?></h1>

        <nav>
            <ul>
                <li><a class="activo"><?php echo $menuActivo; ?></a></li>
                <li><a><?php echo $menuSesion; ?></a></li>
            </ul>
        </nav>
    </div>
</header>

<main>

    <section class="hero">
        <p id="estado-sesion"><?php echo $textoSesion; ?></p>
        <p><?php echo $mensajePublico; ?></p>
    </section>

    <div class="paneles">

        <div class="panel resumen">
            <h2>Datos del evento</h2>
            <ul class="actividades">
                <li>Fecha del evento: <?php echo $fechaEvento; ?></li>
                <li>Precio base: <?php echo $precioBase; ?> €</li>
                <li>Precio por hora: <?php echo $precioPorHora; ?> €</li>
            </ul>
        </div>

        <div class="panel">
            <h2>Resultado del cálculo</h2>
            <p>Total calculado: <strong><?php echo number_format($totalCalculado, 2); ?> €</strong></p>
            <p><?php echo $coincideTotal; ?></p>
        </div>

    </div>

    <form method="post" class="formulario">

        <fieldset>
            <legend>Reserva</legend>

            <label>Nombre</label>
            <input
                type="text"
                name="nombre"
                value="<?php echo htmlspecialchars($nombre); ?>"
                class="<?php echo $nombreError ? 'invalido' : ''; ?>"
            >
            <p class="error"><?php echo $nombreError; ?></p>

            <label>Email</label>
            <input
                type="email"
                name="email"
                value="<?php echo htmlspecialchars($email); ?>"
            >

            <label>Horas</label>
            <input
                type="number"
                step="0.5"
                name="horas"
                value="<?php echo htmlspecialchars($horas); ?>"
            >

            <label>Total declarado</label>
            <input
                type="number"
                step="0.01"
                name="totalDeclarado"
                value="<?php echo htmlspecialchars($totalDeclarado); ?>"
            >

            <label>Fecha de reserva</label>
            <input
                type="date"
                name="fechaReserva"
                value="<?php echo htmlspecialchars($fechaReserva); ?>"
                class="<?php echo $fechaError ? 'invalido' : ''; ?>"
            >
            <p class="error"><?php echo $fechaError; ?></p>

            <label>Comentario</label>
            <textarea name="comentario"><?php echo htmlspecialchars($comentario); ?></textarea>

        </fieldset>

        <button class="boton">Enviar reserva</button>

    </form>

</main>

<footer>
    Plataforma TechLab © 2026
</footer>

</body>
</html>