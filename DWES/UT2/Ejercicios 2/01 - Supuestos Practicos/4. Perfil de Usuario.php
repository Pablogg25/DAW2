<?php
$nombre          = "Alicia";
$apellidos       = "Nozal González";
$usuario         = "alicia21";   
$ciudad          = "Madrid";
$edad            = 28;

$avatar = "img/" . $nombre . ".png";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

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

    <title>Perfil de usuario</title>
</head>

<body>

    <div class="perfil">

        <img src="<?php echo $avatar; ?>" alt="Avatar del usuario">

        <h2><?php echo $nombre . " " . $apellidos; ?></h2>
        <p>@<?php echo $usuario; ?></p>
        <p><?php echo $ciudad; ?></p>
        <p><?php echo $edad; ?> años</p>

        <div class="enlaces">
            <a href="enviarMensaje.php?user=<?php echo $usuario; ?>">Enviar mensaje</a>
            <a href="verPublicaciones.php?user=<?php echo $usuario; ?>">Ver publicaciones</a>
            <a href="editarPerfil.php?user=<?php echo $usuario; ?>">Editar perfil</a>
        </div>

    </div>

</body>
</html>
