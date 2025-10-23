<?php
$v1 = 15;
$v2 = 17;

function Suma()
{
    global $v1;
    global $v2;

    return $v1 + $v2;
}

echo Suma();
