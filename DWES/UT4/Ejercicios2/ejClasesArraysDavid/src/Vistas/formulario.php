<?php
declare(strict_types=1);



function getFormulario(array $datos,array $erroresNombre, array $erroresPrecio, array $erroresCantidad):void{
    echo '<form method="post" action="'.Helper::h($_SERVER['PHP_SELF']).'">';
    echo '<table>';
    echo '<tr><td>Nombre: </td><td>
        <input type="text" 
        name="nombre"
        value="'.
        $datos["nombre"].'"
        />
    </td></tr>';
    if(!empty($erroresNombre)){
        echo '<tr><td colspan="2" align="right"><div style="color:red;font-weight:bold">';
        foreach($erroresNombre as $error){
            echo '<p>'.$error.'</p>';
        }
        echo '</div>';
    }
    
    echo '<tr><td>Precio: </td><td><input type="number" name="precio" step="0.01" value="'.$datos["precio"].'"/></td></tr>';
    if(!empty($erroresPrecio)){
        echo '<tr><td colspan="2" align="right"><div style="color:red;font-weight:bold">';
        foreach($erroresPrecio as $error){
            echo '<p>'.$error.'</p>';
        }
        echo '</div>';
    }
    echo '<tr><td>Cantidad: </td><td><input type="number" name="cantidad" value="'.$datos["cantidad"].'" step="1"/></td></tr>';
    if(!empty($erroresCantidad)){
        echo '<tr><td colspan="2" align="right"><div style="color:red;font-weight:bold">';
        foreach($erroresCantidad as $error){
            echo '<p>'.$error.'</p>';
        }
        echo '</div>';
    }
    echo '<tr><td colspan="2" align="right"><input type="submit" value="Guardar"/></td></tr>';
    echo '</table>';
    echo '</form>';
}

?>