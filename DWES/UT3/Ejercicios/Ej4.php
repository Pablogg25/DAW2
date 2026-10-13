<?php
$variable = rand(1, 2);
if ($variable == 1) {
    $variable = 'dentro';
} else {
    $variable = 'afuera';
}

switch ($variable) {
    case 'dentro':
        echo $variable;
        break;
    case 'afuera':
        echo $variable;
        break;
    default:
        echo 'Ninguna';
}
