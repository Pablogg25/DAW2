<?php
$a = $_POST['a'];
$b = $_POST['b'];
$op = $_POST['op'];
if ($a === null || $b === null) {
    echo 'Los valores introducidos no son validos';
} else {
    switch ($op) {
        case 'suma':
            echo $a . ' + ' . $b . ' = ' . $a + $b;
            break;
        case 'resta':
            echo $a . ' - ' . $b . ' = ' . $a - $b;
            break;
        case 'producto':
            echo $a . ' * ' . $b . ' = ' . $a * $b;
            break;
        case 'cociente':
            echo $a . ' / ' . $b . ' = ' . $a / $b;
            break;
    }
    echo '<p><a href="index.html">Volver</a></p>';
}
