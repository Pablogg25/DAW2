<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php

    $protocolo = "https://";
    $punto = ".";
    $recurso = "www";
    $dominio = "educantabria.com";

    $url = "";
    $url .= $protocolo;
    $url .= $recurso;
    $url .= $punto;
    $url .= $dominio;

    echo $url;
    ?>
</body>

</html>