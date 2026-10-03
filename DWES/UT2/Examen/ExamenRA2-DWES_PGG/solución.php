<?php
require "./Datos.php";

/*Inicializamos las variables en caso de que no vengan inicializadas*/
    $sesionIniciada ??= "";
    
    $nombre ??= "";
    $email ??= "";
    $anioNacimiento ??= "";    

    $dwes ??= "";
    $daw ??= "";
    $dwec ??= "";
    $diw ??= "";
    $piDaw ??= "";
    $devopsDaw ??= "";
    $ipe2Daw ??= "";
    $digDaw ??= "";
    
    $precioPagado ??= "";
    /*Variables Header*/
    $imagen = $sesionIniciada ?  "./img/eduardo.png":"./img/visitante.png" ;
    $usuario = $sesionIniciada ? $nombre : "visitante";
    $textoSesion = $sesionIniciada ? "Cerrar sesión" : "Iniciar sesión";

    /*Sección*/
    $totalModulos = 3;
    $precioModulo = 33.33;
    $iva = 0.21;
    $precioCalculado = number_format($totalModulos*$precioModulo*(1+0.21),2);
    $errorPrecios = $precioCalculado == $precioPagado ? "correcto" : "error";
    $errorPreciosMensaje = $precioCalculado == $precioPagado ? "ok" : "error";


    /*Sección 2*/
    $checkDaw = $daw ? "checked":"";
    $checkDevOps= $devopsDaw ? "checked":"";
    $checkDig= $digDaw ? "checked":"";
    $checkDwec= $dwec ? "checked":"";
    $checkDwes= $dwes ? "checked":"";
    $checkDiw= $diw ? "checked":"";
    $checkIpe= $ipe2Daw ? "checked":"";
    $checkProyecto = $piDaw ? "checked":"";
     ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <header>
        <img src="<?= $imagen ?>" alt="Imagen Avatar" class="avatar">
        <h1> Bienvenido/a <?=$usuario?></h1>
        <br><br>
        <a href="#"><?=$textoSesion?></a>
    </header>
    <main>
        <section class="<?= $errorPrecios?>">
            <h2> Precio matrícula</h2>
            <table>
                <tr>
                    <th>Concepto</th>
                    <th>Valor</th>
                </tr>
                <tr>
                    <td>Modulos matriculados</td>
                    <td><?=$totalModulos?></td>
                </tr>
                <tr>
                    <td>Importe calculado</td>
                    <td><?=$precioCalculado?></td>
                </tr>
                <tr>
                    <td>Importe pagado</td>
                    <td><?=$precioPagado?></td>
                </tr>
            </table>
            <p class="mensaje-<?=$errorPreciosMensaje?>">Importe correcto</p>
        </section>
        <section>
            <h2>
                Datos personales
            </h2>
            <fieldset>
                <legend>Información Personal</legend>
                <label for="nombre">Nombre</label>
                <input type="text" value=<?=$nombre?>>
                <label for="email">Email</label>
                <input type="text" value="<?= $email?>">
                <label for="number">Año de nacimiento</label>
                <input type="number" value="<?=$anioNacimiento?>">

            </fieldset>
            <fieldset>
                <h2>Modulos matriculados</h2>
<p>Desarrollo Web Cliente</label>
                <input type="checkbox" <?=$checkDwec ?>>
                
                <p >Despliegue de aplicaciones web</label>
                <input type="checkbox"  <?=$checkDaw ?>>
                
                <p >Diseño de Interfazes Web</label>
                <input type="checkbox" <?=$checkDiw ?>>
                
                <p >Desarrollo Web Entorno Servidor</label>
                <input type="checkbox" <?=$checkDwes?>>
                
                <p >Proyecto Intermodular</label>
                <input type="checkbox" <?=$checkProyecto?>>
                
                <p >DevOps</label>
                <input type="checkbox" <?=$checkDevOps ?>>
                
                <p >IPE II</label>
                <input type="checkbox"  <?=$checkIpe ?>>
                
                <p >Digitalización</label>
                <input type="checkbox" <?=$checkDig ?>>
            </fieldset>
            <fieldset>
                <h2>Modalidades especiales</h2>
                
                <p>Dual</p>

                <section>
                    <h2>Preferencia de Empresa Dual</h2>
                    <p>Empresa Dual S.A.</p>
                </section>

            </fieldset>
            <fieldset>
                <button class="confirmar">Confirmar Datos</button>
                <button class="modificar">Modificar datos</button>
            </fieldset>
        </section>
    </main>
    <footer>Aplicación de matricula CFGS DAW</footer>
</body>
</html>