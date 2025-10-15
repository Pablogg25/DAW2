<?php
$variable = rand(1, 2);
if ($variable == 1) {
    $variable = 'dentro';
} else {
    $variable = 'afuera';
}

match ($variable) {
    'dentro' => print $variable,
    'afuera' => print $variable,
    default => print 'ESTA NO ES NINGUNA DE LAS OPCIONES VALIDAS'
};
