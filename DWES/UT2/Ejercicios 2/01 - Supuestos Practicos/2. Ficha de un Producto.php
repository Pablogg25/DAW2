<?php 
$nombre_producto = "Portatil Acer Inspire";
$imagen = "./img/acer.jpg";
$marca = "ACER";
$categoria = "Informatica";
$referencia = "AC-4587";
$descripción = "El producto Portatil Acer Aspire pertenece 
a la categoria Informatica y ha sido fabricado por Acer. 
Su referencia interna es AC-4587";

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ficha de un Producto</title>

<body>
    <div>
        <img src="<?php echo $imagen?>" alt="">
    </div>
    <div>
        <h1><?php echo $nombre_producto?></h1>

        <h2 style=color:green>749.99 €</h2>

        <p><strong>Marca: </strong><?php echo $marca?></p>

        <p><strong>Categoría: </strong><?php echo $categoria?></p>
        <h3><strong>Descripción: </strong></h3>
        <p><?php echo $descripción?></p>
    </div>
</body>
</head>

<body>

</body>

</html>