
<?php
function contadorLlamadas()
{
    static $contador = 0;
    $contador++;
    return $contador;
}

// Ejemplo de uso
echo "Llamada 1: " . contadorLlamadas() . "<br>";
echo "Llamada 2: " . contadorLlamadas() . "<br>";
echo "Llamada 3: " . contadorLlamadas() . "<br>";
?>
