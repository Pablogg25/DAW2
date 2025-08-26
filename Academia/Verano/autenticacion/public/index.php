<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <title>Document</title>
</head>

<body class="d-flex justify-content-center align-items-center vh-100">
    <div class="container">
        <div class="rounded-5 w-50 p-5 bg-success text-white mx-auto">
            <form method="post" action="login.php" class="border border-warning p-5 rounded-5">
                <label for="usuario">User:</label>
                <input type="text" name="usuario" class="form-control" required autocomplete="new-password">
                <label for="pass">Password:</label>
                <input type="password" name="pass" class="form-control" required autocomplete="new-password">
                <div class="text-center mt-3">
                    <input type="submit" value="Acceder" class="form-control btn btn-warning mt-2 p-3">
                </div>
            </form>
            <div class="text-end mt-3">
                <a href="nuevoUsuario.php" class="btn btn-danger p-3">Nuevo usuario</a>
            </div>
        </div>
    </div>
</body>

</html>