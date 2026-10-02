<?php

require "datos2.php";

/* Directiva con constante y operadores a nivel de bit */
$nivelErrores = E_ALL & ~E_NOTICE;
error_reporting($nivelErrores);
ini_set("display_errors", "1");

/* Modo visual: ternario para clase y mensaje */
$claseTema = $modoOscuro ? "modo-oscuro" : "modo-claro";
$mensajeTema = $modoOscuro ? "Modo oscuro activado." : "Modo claro activado.";

/* Sesión: cambia el menú y el contenido de un único párrafo (sin duplicar sección) */
$opcionSesion = $sesionIniciada ? "Logout" : "Login";
$tituloSesion = $sesionIniciada ? "Área privada" : "Acceso de participante";
$contenidoSesion = $sesionIniciada
    ? "Hola, " . $nombre . ". Tienes una reserva iniciada."
    : "Inicia sesión para acceder a tu zona privada.";

/* Inicializaciones por defecto en caso de venir a null */
$nombre ??= "";        
$email ??= "";
$horas ??= "";
$totalDeclarado ??= "";
$fechaReserva ??= "";
$comentario ??= "";

/* Validaciones del formulario */
$errorNombre =  empty($nombre)
    ? "El nombre es obligatorio."
    : "";

$hoy = strtotime(date("Y-m-d"));
$reserva = strtotime($fechaReserva !== "" ? $fechaReserva : date("1970-01-01")); 
        //el valor tras los : es un valor por defecto que no influye para el siguiente cálculo, 
        //pero necesario para completar esta instrucción sin error. Podría ser cualquier date.

$errorFechaReserva = empty($fechaReserva)
    ? "Indica una fecha."
    : (($reserva < $hoy) ? "La fecha no puede ser anterior a hoy." : "");

/* Floats: total calculado con el precio fijo del servidor, comparado con epsilon */
$totalCalculado = $precioBase + ((float)$horas * $precioPorHora);
$epsilon = 0.00001;
$errorTotal = !empty($horas) && !empty($totalDeclarado)
            //&& ($totalCalculado == $totalDeclarado) esto no funcionaría por la precisión de los floats
    && !(abs($totalCalculado - (float)$totalDeclarado) >= $epsilon)
    ? ""
    : "El total no coincide con el cálculo."; 
?>

<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title><?= $nombreEvento ?></title>
    <link rel="stylesheet" href="estilos.css">
</head>

<body class="<?= $claseTema ?>">
    <header>
        <div>
            <div><strong><?= $nombreEvento ?></strong><small> <?= $mensajeTema ?></small></div>
            <nav>
                <ul>
                    <li><a class="activo" href="#"><?= $menuActivo ?></a></li>
                    <li><a href="#">Programa</a></li>
                    <li><a href=<?=$opcionSesion,".php"?>><?= $opcionSesion ?></a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main>
        <section class="hero">
            <h1><?= $nombreEvento ?></h1>
            <p><?= $mensajePublico ?></p>
            <p id="estado-sesion"><strong><?= $tituloSesion ?>:</strong> <?= $contenidoSesion ?></p>
        </section>

        <div class="paneles">
            <section class="panel">
                <h2>Información</h2>
                <p><strong>Fecha:</strong> <?= date("d/m/Y", strtotime($fechaEvento)) ?></p>
                <p><strong>Precio base:</strong> <?= number_format($precioBase, 2, ",", ".") ?> €</p>
                <ul class="actividades">
                    <li>Desarrollo web</li>
                    <li>PHP en servidor</li>
                </ul>
            </section>
            <section class="panel resumen">
                <h2>Datos Recibidos</h2>
                <p>Correo: <?= $email ?></p>
                <p>Horas: <?= $horas ?></p>
                <p>Total declarado: <?= $totalDeclarado ?> €</p>
            </section>
        </div>

        <section class="panel formulario">
            <h2>Reserva</h2>
            <form method="post" action="">
                <fieldset>
                    <legend>Datos personales</legend>
                    <label for="nombre">Nombre</label>
                    <input id="nombre" name="nombre" type="text" value="<?= $nombre ?>" 
                        class="<?= $errorNombre !== "" ? "invalido" : "" ?>" required>
                    <?= $errorNombre !== "" ? '<p class="error">' . $errorNombre . '</p>' : "" ?>

                    <label for="email">Correo</label>
                    <input id="email" name="email" type="email" value="<?= $email ?>" required>
                </fieldset>
                <fieldset>
                    <legend>Datos Reserva</legend>
                    <label for="horas">Horas adicionales</label>
                    <input id="horas" name="horas" type="number" step="0.5" min="0" value="<?= $horas ?>">

                    <label for="totalDeclarado">Total calculado por el usuario (€)</label>
                    <input id="totalDeclarado" name="totalDeclarado" type="number" step="0.01" min="0" 
                        value="<?= $totalDeclarado ?>" class="<?= $errorTotal !== "" ? "invalido" : "" ?>">
                    <?= $errorTotal !== "" ? '<p class="error">' . $errorTotal . '</p>' : "" ?>

                    <label for="fechaReserva">Fecha de reserva</label>
                    <input id="fechaReserva" name="fechaReserva" type="date" value="<?= $fechaReserva ?>" 
                        class="<?= $errorFechaReserva !== "" ? "invalido" : "" ?>">
                    <?= $errorFechaReserva !== "" ? '<p class="error">' . $errorFechaReserva . '</p>' : "" ?>

                    <label for="comentario">Comentario</label>
                    <textarea id="comentario" name="comentario" rows="4"><?= $comentario ?></textarea>
                </fieldset>
                <button class="boton" type="submit">Validar reserva</button>
            </form>
        </section>
    </main>
    <footer><?= $nombreEvento ?> · Página generada dinámicamente con PHP</footer>
</body>

</html>
