<?php
require_once 'src/Service/ProductoService.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejemplos Bases de datos</title>
</head>
<body>

<?php

    // LISTADO DE RESULTADOS 
    $listaProductos=[];
    $productoService=new ProductoService();
    $listaProductos=$productoService->listAll();
    echo '<ul>';
    foreach($listaProductos as $p){
        echo '<li>'.$p->getNombre().'</li>';
    }
    echo '</ul>';

    // INSERCIÓN DE DATOS
    $producto=new Producto(0,'Altavoces',32.90,8);
    /*
    
    $nuevoProducto=$productoService->save($producto);
    if($nuevoProducto===null){
        echo 'No se ha creado el producto.';
    }else{
        echo 'El producto se ha creado correctamente.';
    }

    echo '<br/>NUEVO LISTADO DE PRODUCTOS<br/>';
    $nuevoListadoProdutos=[];
    $nuevoListadoProdutos=$productoService->listAll();
    echo '<ul>';
    foreach($nuevoListadoProdutos as $prod){
        echo '<li>'.$prod->getNombre().'</li>';
    }
    echo '</ul>';
    */
    //ACTUALIZACIÓN DE DATOS
    $nuevoProducto=$producto;
    $nuevoProducto->setCantidad(20);
    $nuevoProducto->setNombre("Bocinas");
    $productoActualizado=$productoService->update(5,$nuevoProducto);
    if($productoActualizado===null){
        echo '<br/>No se ha podido modificar el producto.<br/>';
    }else{
        echo '<br/>Producto modificado correctamente.<br/>';
    }
    $actualizados=[];
    $actualizados=$productoService->listAll();
    echo '<br/>DESPUES DE ACTUALIZAR<br/>';
    echo '<ul>';
    foreach($actualizados as $prod){
        echo '<li>'.$prod->getNombre().'</li>';
    }
    echo '</ul>';
?>
    
</body>
</html>