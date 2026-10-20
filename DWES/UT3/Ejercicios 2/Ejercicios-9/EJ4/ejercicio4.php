<?php
$suma = null;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['numeros']) && is_array($_POST['numeros'])) {
        $suma = 0;
        foreach ($_POST['numeros'] as $numero) {
            $suma += (int)$numero;
        }
    }
}
?>

<form method="post">
    <h2>Introducir 10 números</h2>
    <?php
    // Crear 10 inputs dinámicamente
    for ($i = 1; $i <= 10; $i++) {
        // Si el formulario ya se envió, mantener el valor
        $valor = isset($_POST["numeros"][$i - 1]) ? $_POST["numeros"][$i - 1] : $i;
        echo "Número $i: <input type='number' name='numeros[]' value='$valor'><br>";
    }
    ?>
    <br>
    <input type="submit" value="Sumar">
</form>

<?php
// Mostrar el resultado si se calculó la suma
if ($suma !== null) {
    echo "<h3>La suma de los números es: $suma</h3>";
}
?>