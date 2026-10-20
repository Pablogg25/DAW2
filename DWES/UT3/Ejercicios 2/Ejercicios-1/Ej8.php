<?php
// Cantidades compradas en kg 
$compra = [
    "Manzana" => 2,
    "Platano" => 1.5,
    "Naranja" => 5
];


$productos = ["Manzana" => 5, "Platano" => 3, "Naranja" => 4, "Kiwi" => 6];

echo "<h3>El precio de la compra es</h3> <br>

        Manzanas (" . $compra['Manzana'] . "kg): " . $productos['Manzana'] . " * 2 = " . $productos['Manzana'] * 2 .
    "<br><br> Platanos (" . $compra['Platano'] . "kg): " . $productos['Platano'] . " * 2 = " . $productos['Platano'] * 2 .
    "<br><br> Naranjas (" . $compra['Naranja'] . "kg): " . $productos['Naranja'] . " * 2 = " . $productos['Naranja'] * 2;