<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo usuario</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body>
    <div class="container rounded mt-5 p-5 bg-success text-white">
        <form method="post" action="inserta.php">
            <label for="usuario">User:</label>
            <input type="text" name="usuario" class="form-control" required autocomplete="new-password">
            <label for="pass">Password:</label>
            <input type="password" name="pass" class="form-control" required autocomplete="new-password">
            <input type="submit" value="Dar de alta" class="btn btn-warning mt-2">
        </form>
        <a href="index.php" class="btn btn-danger form-control mt-5">Salir</a>
    </div>
</body>

</html>