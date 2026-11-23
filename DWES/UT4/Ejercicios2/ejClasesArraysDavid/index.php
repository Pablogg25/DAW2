<?php
declare(strict_types=1);
require_once('src/Modelos/Inventario.php');
require_once('src/Vistas/formulario.php');
require_once('src/Util/validaciones.php');
/*
$p=new Producto("Portátil",850.00,22);
$p1=new Producto("Ordenador de escritorio",1250.00,15);
$p2=new Producto("Ratón",15.00,35);
$p3=new Producto("Teclado USB",20.00,18);
$p4=new Producto("Teclado inalámbrico Logitech",30.00,16);

$inventario=new Inventario();

$inventario->addProducto($p);
$inventario->addProducto($p1);
$inventario->addProducto($p2);
$inventario->addProducto($p3);
$inventario->addProducto($p4);
*/

$inventario=new Inventario();
$nombre=$_POST["nombre"]??"";
$precio=$_POST["precio"]??0.00;
$cantidad=$_POST["cantidad"]??0;
$erroresNombre=[];
$erroresPrecio=[];
$erroresCantidad=[];
$datos=[];

if(validaNombre($nombre,$erroresNombre)){
    $datos["nombre"]=$nombre;
}else{
    $datos["nombre"]="";
}
if(validaPrecio($precio,$erroresPrecio)){
    $datos["precio"]=(float)$precio;
}else{
    $datos["precio"]=0.00;
}
if(validaCantidad($cantidad,$erroresCantidad)){
    $datos["cantidad"]=$cantidad;
}else{
    $datos["cantidad"]=0;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inventario productos</title>
</head>
<body>
    <h1>Inventario productos</h1>
    <?php
    /*
    echo '<h4>Listado de todos los productos</h4>';
        $inventario->listarProductos();
        $texto="usb";
        echo '<h4>Buscar "'.$texto.'"</h4>';
        $encontrado=$inventario->porNombre($texto);
        if($encontrado===null){
            echo '<p>No se ha encontrado el producto.</p>';
        }
        else{
            echo '<p>Producto encontrado: '.$encontrado->toString().' €</p>';
        }
        echo '<h4>Total: '.$inventario->getValorTotal().' €</h4>';
        */
        getFormulario($datos,$erroresNombre,$erroresPrecio,$erroresCantidad);
    ?>
</body>
</html>