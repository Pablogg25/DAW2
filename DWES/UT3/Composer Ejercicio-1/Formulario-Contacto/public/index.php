<?php
// Mostrar mensajes según GET
function mostrarMensaje() {
    if (isset($_GET['error'])) {
        if ($_GET['error'] == 1)
            echo "<p style='color:red'>Por favor, rellena todos los campos.</p>";

        if ($_GET['error'] == 2)
            echo "<p style='color:red'>Por favor, introduce un email válido.</p>";

        if ($_GET['error'] == 3)
            echo "<p style='color:red'>Error al enviar el correo.</p>";
    }

    if (isset($_GET['success']) && $_GET['success'] == 1)
        echo "<p style='color:green'>Email enviado correctamente.</p>";
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Formulario de Contacto</title>
</head>
<body>

<h2>Formulario de Contacto</h2>

<?php mostrarMensaje(); ?>

<form action="procesar.php" method="POST">
    <label>Nombre:</label><br>
    <input type="text" name="nombre"><br><br>

    <label>Email:</label><br>
    <input type="text" name="email"><br><br>

    <label>Mensaje:</label><br>
    <textarea name="mensaje" rows="6" cols="40"></textarea><br><br>

    <button type="submit">Enviar</button>
</form>

</body>
</html>
