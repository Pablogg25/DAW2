<?php
require_once __DIR__.'/datos/ConexionBD.php';
require_once __DIR__.'/datos/ProductoPDODAO.php';

$conexion=ConexionBD::getConexion();
/*if($conexion===null)echo 'Error';
else echo 'OK';*/

$dao=new ProductoPDODAO($conexion);
$listado=[];
$listado=$dao->listAll();
echo '<ul>';
foreach($listado as $l){
    echo '<li>'.$l->getNombre().'</li>';
}
echo '</ul>';

echo '<br/><br/>';
$p=$dao->byId(2);
if($p===null)echo 'No se ha encontrado el producto.';
else echo 'producto: '.$p->getNombre().' - Precio: '.$p->getPrecio();

$nuevo=new Producto(0,"Teclado",20.00);
/*$creado=$dao->save($nuevo);
if($creado===null)echo 'Error al guardar';
else echo 'Guardado correctamente';

echo '<br/><br/>NUEVA LISTA';
$listado=$dao->listAll();
echo '<ul>';
foreach($listado as $l){
    echo '<li>'.$l->getNombre().'</li>';
}
echo '</ul>';

$encontrado=$dao->byId(5);
$encontrado->setNombre("Teclado USB");
$encontrado->setPrecio(35.25);
$modificado=$dao->update(5,$encontrado);
if($modificado===null)echo '<br/>Error';
else echo '<br/>Producto modificado: '.$modificado->getNombre().' - Precio: '.$modificado->getPrecio().' €';

$eliminado=$dao->delete(5);
if($eliminado===null)echo '<br/>No se ha podido eliminar';
else echo '<br/>Producto eliminado: '.$eliminado->getNombre();*/

$nombre="Producto B";
$nuevoNombre="MI PRODUCTO B";
$nuevoPrecio=33.33;
$cambiado=$dao->reemplazarProducto($nombre,$nuevoNombre,$nuevoPrecio);
if($cambiado===null)echo '<br/>Error';
else echo '<br/>Producto: '.$cambiado->getNombre().' - Precio: '.$cambiado->getPrecio();
?>