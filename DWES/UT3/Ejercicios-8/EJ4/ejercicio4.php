<?php
$numero = $_POST['numero'];
if ($numero % 2 === 0) {
    echo 'EL numero ' . $numero . ' es par';
} else {
    echo 'El numero ' . $numero . ' es impar';
}
echo '<p><a href="index.html">Volver</a></p>';