<?php
$numero = rand(1, 5);

/*if ($numero == 1) {
    echo 'uno';
} else if ($numero == 2) {
    echo 'dos';
} else if ($numero == 2) {
    echo 'dos';
} else   if ($numero == 3) {
    echo 'tres';
} else  if ($numero == 4) {
    echo 'cuatro';
} else  if ($numero == 5) {
    echo 'cinco';
}*/

/*switch ($numero) {
    case 1:
        echo 'uno';
        break;
    case 2:
        echo 'dos';
        break;
    case 3:
        echo 'tres';
        break;
    case 4:
        echo 'cuatro';
        break;
    case 5:
        echo 'cinco';
        break;
}*/
match ($numero) {
    1 => print 'uno',
    2 => print 'dos',
    3 => print 'tres',
    4 => print 'cuatro',
    5 => print 'cinco',
    default => print 'no ha salido ninguno'
};
