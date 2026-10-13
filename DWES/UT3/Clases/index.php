<?php
require("producto.php");

$p = new Producto("Iphone17", 11, 1);


echo $p->muestra();
echo "<br>" . $p->mostrarDatos();
