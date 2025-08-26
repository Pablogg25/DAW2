
<?php
function menu(): void
{
    echo '
    <header><nav class="navbar bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand d-flex align-items-center" href="index.php?m=inicio">
      <img src="../app/images/LogoNBA.png" alt="Logo NBA" width="30" height="30" class="d-inline-block align-text-top me-2">
      <strong>NBA</strong>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title d-flex align-items-center" id="offcanvasNavbarLabel">
          <img src="../app/images/LogoNBA.png" alt="Logo NBA" width="30" height="30" class="d-inline-block align-text-top me-2">
          <strong>NBA</strong>_
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="index.php?m=inicio">Inicio</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Opciones
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="index.php?m=listar">Listar Equipos</a></li>
              <li><a class="dropdown-item" href="index.php?m=agregar">Agregar / Modificar Equipo</a></li>
              <li><a class="dropdown-item" href="index.php?m=politica">Politica de Privacidad</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav></header>
</body>
</html>
    ';
}

function AgregarEquipo(): void
{
    echo '
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 80vh; margin-top:100px;">
                  <div class="card shadow-lg p-4" style="max-width: 500px; width: 100%; border-top: 5px solid #17408B; border-bottom: 5px solid #C9082A;">
                    <div class="text-center mb-4">
                      <img src="../app/images/LogoNBA.png" alt="Logo NBA" width="60" height="60" class="mb-2">
                      <h3 class="fw-bold" style="color:#17408B; letter-spacing:2px;">Agregar Equipo NBA</h3>
                    </div>
                    <form method="post" action="procesa.php?modo=nuevo">
                      <div class="mb-3">
                        <label for="nombre" class="form-label fw-semibold">Nombre</label>
                        <input type="text" class="form-control" name="nombre" id="nombre" required>
                      </div>
                      <div class="mb-3">
                        <label for="ciudad" class="form-label fw-semibold">Ciudad</label>
                        <input type="text" class="form-control" name="ciudad" id="ciudad" required>
                      </div>
                      <div class="mb-3">
                        <label for="conferencia" class="form-label fw-semibold">Conferencia</label>
                        <input type="text" class="form-control" name="conferencia" id="conferencia" required>
                      </div>
                      <div class="mb-3">
                        <label for="division" class="form-label fw-semibold">División</label>
                        <input type="text" class="form-control" name="division" id="division" required>
                      </div>
                      <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary fw-bold" style="background-color:#17408B; border:none;">Guardar</button>
                        <a href="index.php" class="btn btn-outline-secondary">Volver</a>
                      </div>
                    </form>
                  </div>
                </div>';
}
function Inicio(): void{
  echo '<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NBA - Inicio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #17408B 0%, #C9082A 100%);
            min-height: 100vh;
        }
        .nba-logo {
            background: #fff;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .nba-title {
            color: #17408B;
            font-weight: bold;
            letter-spacing: 2px;
        }
        .nba-card {
            background: rgba(255,255,255,0.95);
            border-top: 5px solid #17408B;
            border-bottom: 5px solid #C9082A;
        }
        .nba-section-title {
            color: #C9082A;
            font-weight: bold;
            margin-bottom: 10px;
            letter-spacing: 1px;
        }
        .nba-player-img {
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.10);
        }
    </style>
</head>
<body>
    <div class="container py-5">
        <div class="text-center mb-5">
            <div class="nba-logo mb-3 d-inline-block">
                <img src="../app/images/LogoNBA.png" alt="Logo NBA" width="80" height="80">
            </div>
            <h1 class="nba-title mb-2">Bienvenido a la NBA</h1>
            <p class="fs-5 text-white">La liga de baloncesto más espectacular del mundo</p>
        </div>
        <div class="row g-4">
            <div class="col-md-4">
                <div class="nba-card card h-100">
                    <div class="card-body">
                        <h5 class="nba-section-title">¿Qué es la NBA?</h5>
                        <p>
                            La NBA (National Basketball Association) es la principal liga de baloncesto profesional de Estados Unidos y la más reconocida a nivel mundial. Fundada en 1946, reúne a los mejores jugadores y equipos del planeta.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="nba-card card h-100">
                    <div class="card-body">
                        <h5 class="nba-section-title">Equipos Legendarios</h5>
                        <ul>
                            <li>Los Angeles Lakers</li>
                            <li>Boston Celtics</li>
                            <li>Chicago Bulls</li>
                            <li>Golden State Warriors</li>
                            <li>Miami Heat</li>
                        </ul>
                        <p class="mb-0">Cada equipo tiene su propia historia y grandes estrellas.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="nba-card card h-100">
                    <div class="card-body">
                        <h5 class="nba-section-title">Jugadores Icónicos</h5>
                        <div class="d-flex align-items-center mb-2">
                            <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png" alt="LeBron James" width="50" class="nba-player-img me-2">
                            <span>LeBron James</span>
                        </div>
                        <div class="d-flex align-items-center mb-2">
                            <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/893.png" alt="Stephen Curry" width="50" class="nba-player-img me-2">
                            <span>Stephen Curry</span>
                        </div>
                        <div class="d-flex align-items-center mb-2">
                            <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/977.png" alt="Michael Jordan" width="50" class="nba-player-img me-2">
                            <span>Michael Jordan</span>
                        </div>
                        <p class="mb-0">Descubre más sobre las leyendas y actuales estrellas de la NBA.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-md-6">
                <div class="nba-card card h-100">
                    <div class="card-body">
                        <h5 class="nba-section-title">Últimos Campeones</h5>
                        <ul>
                            <li>2024: Denver Nuggets</li>
                            <li>2023: Golden State Warriors</li>
                            <li>2022: Milwaukee Bucks</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="nba-card card h-100">
                    <div class="card-body">
                        <h5 class="nba-section-title">Curiosidades NBA</h5>
                        <ul>
                            <li>La NBA tiene 30 equipos divididos en dos conferencias.</li>
                            <li>El trofeo de campeón se llama Larry O Brien.</li>
                            <li>El All-Star Game reúne a los mejores jugadores cada año.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <footer class="text-center text-white mt-5">
            <p>&copy; 2025 NBA Application</p>
        </footer>';
}
function politica(): void{
  echo '<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Política de Privacidad - NBA Application</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #17408B 0%, #C9082A 100%);
            min-height: 100vh;
        }
        .nba-card {
            background: rgba(255,255,255,0.97);
            border-top: 5px solid #17408B;
            border-bottom: 5px solid #C9082A;
            margin-top: 60px;
        }
        .nba-section-title {
            color: #C9082A;
            font-weight: bold;
            margin-bottom: 10px;
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="nba-card card shadow-lg p-4">
                    <h1 class="nba-section-title text-center mb-4">Política de Privacidad y Protección de Datos</h1>
                    <p>
                        En <strong>NBA Application</strong> nos comprometemos a proteger la privacidad de nuestros usuarios y a garantizar la seguridad de sus datos personales conforme a la normativa vigente (Reglamento (UE) 2016/679, RGPD).
                    </p>
                    <h5 class="nba-section-title">¿Qué datos recogemos?</h5>
                    <ul>
                        <li>Datos identificativos (nombre, correo electrónico, etc.)</li>
                        <li>Información de uso de la aplicación (equipos favoritos, estadísticas consultadas, etc.)</li>
                        <li>Datos técnicos (dirección IP, navegador, dispositivo, etc.)</li>
                    </ul>
                    <h5 class="nba-section-title">¿Para qué usamos tus datos?</h5>
                    <ul>
                        <li>Gestionar tu registro y acceso a la aplicación</li>
                        <li>Mejorar la experiencia de usuario y personalizar el contenido</li>
                        <li>Analizar el uso de la plataforma para mejorar nuestros servicios</li>
                        <li>Cumplir con obligaciones legales</li>
                    </ul>
                    <h5 class="nba-section-title">¿Cómo protegemos tus datos?</h5>
                    <ul>
                        <li>Utilizamos medidas de seguridad técnicas y organizativas para proteger tu información</li>
                        <li>No compartimos tus datos con terceros salvo obligación legal</li>
                        <li>Solo el personal autorizado puede acceder a tus datos</li>
                    </ul>
                    <h5 class="nba-section-title">Tus derechos</h5>
                    <ul>
                        <li>Acceder, rectificar o suprimir tus datos personales</li>
                        <li>Solicitar la limitación u oposición al tratamiento</li>
                        <li>Portabilidad de tus datos</li>
                        <li>Presentar una reclamación ante la Agencia Española de Protección de Datos</li>
                    </ul>
                    <p>
                        Para ejercer tus derechos o resolver cualquier duda, puedes contactar con nosotros en <a href="mailto:soporte@nbaapp.com">soporte@nbaapp.com</a>.
                    </p>
                    <p class="text-muted small mt-4 mb-0">
                        Última actualización: julio 2025
                    </p>
                </div>
            </div>
        </div>
        <footer class="text-center text-white mt-5">
            <p>&copy; 2025 NBA Application</p>
        </footer>
    </div>';
}
?>