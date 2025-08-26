<?php
    function contarVocales($texto){
        $vocales = ['a', 'e', 'i', 'o', 'u'];
        $contador = 0;

        foreach(str_split(strtolower($texto)) as $caracter) {
            if (in_array($caracter, $vocales)) {
                $contador++;
            }
        }
        return $contador;
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['texto'])) {
    $texto = $_POST['texto'];
    $numVocales = contarVocales($texto);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Contar vocales</title>
</head>
<body>
    <form method="post">
        <label for="texto">Introduce un texto:</label>
        <textarea name="texto" id="texto" required></textarea>
        <button type="submit">Contar vocales</button>
    </form>

    <?php if (isset($numVocales)): ?>
        <p>El texto tiene <?= $numVocales ?> vocal(es).</p>
    <?php endif; ?>
</body>
</html>