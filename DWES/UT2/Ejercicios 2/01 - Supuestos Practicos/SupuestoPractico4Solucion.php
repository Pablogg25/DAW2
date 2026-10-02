<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Perfil de usuario</title>

<style>
body{
font-family:Arial,sans-serif;
background:#eef2f5;
padding:40px;
}

.perfil{
max-width:700px;
margin:auto;
background:white;
padding:25px;
border-radius:12px;
box-shadow:0 0 12px rgba(0,0,0,.15);
text-align:center;
}

.perfil img{
width:150px;
height:150px;
border-radius:50%;
object-fit:cover;
}

.enlaces{
margin-top:25px;
}

.enlaces a{
text-decoration:none;
background:#1976d2;
color:white;
padding:10px 15px;
margin:5px;
border-radius:5px;
display:inline-block;
}
</style>
</head>
<body>

<?php

$nombre = "Eduardo";
$apellido1 = "Nozal";
$apellido2 = "Gonzalez";
$usuario = $nombre . $apellido1 . $apellido2;
$ciudad = "Suances";
$edad = 41;

$rutaAvatar = "img/" . $nombre . ".png";

$urlMensajes = "mensajes.php?u=" . $usuario;
$urlPublicaciones = "publicaciones.php?u=" . $usuario;
$urlEditar = "editar.php?u=" . $usuario;

?>

<div class="perfil">

    <img src="<?= $rutaAvatar ?>" alt="<?= $nombre ?>">

    <h1><?= $nombre . " " . $apellido1 . " " . $apellido2 ?></h1>

    <p>@<?= $usuario ?></p>

    <p><?= $ciudad ?></p>

    <p><?= $edad ?> años</p>

    <div class="enlaces">

        <a href="<?= $urlMensajes ?>">
            Enviar mensaje
        </a>

        <a href="<?= $urlPublicaciones ?>">
            Ver publicaciones
        </a>

        <a href="<?= $urlEditar ?>">
            Editar perfil
        </a>

    </div>

</div>

</body>
</html>
