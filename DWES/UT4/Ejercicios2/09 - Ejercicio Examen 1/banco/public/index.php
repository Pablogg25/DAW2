<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Groucho Bank - Inicio</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; background: #f8f9fa; }
        .card { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
        .menu { display: flex; gap: 15px; margin-top: 20px; }
        .menu a { display: inline-block; padding: 12px 20px; background: #1d3557; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
        .menu a:hover { background: #457b9d; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Groucho Bank</h1>
        <p>Aplicación interna de gestión de cuentas bancarias y transferencias.</p>
        <div class="menu">
            <a href="cuentas.php">Gestión de Cuentas (CRUD)</a>
            <a href="transferencia.php">Realizar Transferencia</a>
        </div>
    </div>
</body>
</html>