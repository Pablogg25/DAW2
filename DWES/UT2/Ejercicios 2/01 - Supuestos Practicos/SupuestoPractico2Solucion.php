<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Ficha de producto</title>

<style>
body{
font-family: Arial, sans-serif;
background:#ececec;
margin:0;
padding:40px;
}

.producto{
max-width:900px;
margin:auto;
background:white;
border-radius:12px;
overflow:hidden;
box-shadow:0 0 15px rgba(0,0,0,.15);
display:flex;
}

.imagen{
width:40%;
}

.imagen img{
width:100%;
height:100%;
object-fit:cover;
display:block;
}

.datos{
width:60%;
padding:25px;
}

h1{
margin-top:0;
}

.precio{
font-size:2em;
color:#0b7a24;
font-weight:bold;
}

.referencia{
color:#666;
}
</style>
</head>
<body>

<?php

$nombre = "Portátil Acer Aspire";
$precio = 749.99;
$marca = "Acer";
$categoria = "Informática";
$archivoImagen = "portatil.jpg";
$referencia = "AC-4587";

$rutaImagen = "/SupuestosPracticos/img/" . $archivoImagen;

?>

<section class="producto">

<div class="imagen">
<img src="<?= $rutaImagen ?>" alt="<?= $nombre ?>">
</div>

<div class="datos">

<h1><?= $nombre ?></h1>

<p class="precio">
<?= number_format($precio,2) ?> €
</p>

<p>
<strong>Marca:</strong>
<?= $marca ?>
</p>

<p>
<strong>Categoría:</strong>
<?= $categoria ?>
</p>

<p class="referencia">
Referencia: <?= $referencia ?>
</p>

<h2>Descripción</h2>

<p>
El producto <?= $nombre ?> pertenece a la categoría
<?= $categoria ?> y ha sido fabricado por
<?= $marca ?>. Su referencia interna es
<?= $referencia ?>.
</p>

</div>

</section>

</body>
</html>
