<?php
$numero = $_GET["numero"];

$par = "Par";
if ($numero % 2 !== 0) {
    $par = "Impar";
    echo $par;
} else {
    echo $par;
};
