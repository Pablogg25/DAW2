<?php
$numero = $_POST['numero'];

echo 'La tabla de multiplicar del ' . $numero . ' es:<br>';
for ($i = 0; $i <= 10; $i++) {
    echo $numero . ' x ' . $i . ' = ' . $numero * $i.'<br>';
}

echo '<p><a href="index.html">Volver</a></p>';
