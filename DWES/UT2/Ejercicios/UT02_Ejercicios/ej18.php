
<?php
$nombre = "Juan";

function mostrarNombre()
{
    // Acceder a la variable externa usando $GLOBALS
    return $GLOBALS['nombre'];
}

echo mostrarNombre();
?>
