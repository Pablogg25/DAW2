<?php

$peligroso = '<script>alert(1)</script>';
echo $peligroso, "\n";   // peligroso: se ejecuta en el navegador
//echo htmlspecialchars($peligroso, ENT_QUOTES, 'UTF-8'), "\n";
