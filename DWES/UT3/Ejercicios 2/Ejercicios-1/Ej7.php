<?php

$productos = ["Manzana" => 5, "Platano" => 3, "Naranja" => 4, "Kiwi" => 6];

echo "<h3>El precio de la compra es</h3> <br>

        Manzanas (2kg): " . $productos['Manzana'] . " * 2 = " . $productos['Manzana'] * 2 .
    "<br><br> Platanos (1.5kg):" . $productos['Platano'] . " * 2 = " . $productos['Platano'] * 2 .
    "<br><br> Naranjas (5kg):" . $productos['Naranja'] . " * 2 = " . $productos['Naranja'] * 2;