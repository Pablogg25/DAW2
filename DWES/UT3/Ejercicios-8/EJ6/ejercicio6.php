<?php

$menor = $_POST['numero1'];
$mayor = $_POST['numero2'];
for ($i = 0; $i <= 10; $i++) {
    echo '(' . $menor + $i . ',' . $mayor - $i . '), ';
}
echo '<p><a href="index.html">Volver</a></p>';