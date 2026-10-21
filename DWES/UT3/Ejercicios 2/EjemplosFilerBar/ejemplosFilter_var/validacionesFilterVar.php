<?php

$datos = [];
$mensajes = [];

/* ENTERO PAR ENTRE 0 Y 100 */

        $entero = trim($_POST['entero'] ?? '');

        $valor = filter_var(
            $entero,
            FILTER_VALIDATE_INT,
            [
                'options' => [
                    'min_range' => 0,
                    'max_range' => 100
                ]
            ]
        );

        if ($valor !== false && $valor % 2 === 0) {
            $datos['entero'] = $valor;
        } else {
            $mensajes['entero'] =
                'Debe ser un entero par entre 0 y 100.';
        }

/* FLOAT */

        $float = trim($_POST['float'] ?? '');

        $valor = filter_var(
            $float,
            FILTER_VALIDATE_FLOAT
        );

        if ($valor !== false) {
            $datos['float'] = $valor;
        } else {
            $mensajes['float'] =
                'Debe ser un número decimal.';
        }

/* BOOLEAN */

        $boolean = trim($_POST['boolean']); //Si no se selecciona nada, el valor será null, para que de error filter_var
                                           // No podemos poner el operador de fusión de null (??) con cadena vacía porque filter_var devolvería false.

        $valor = filter_var(
            $boolean,
            FILTER_VALIDATE_BOOLEAN,
            FILTER_NULL_ON_FAILURE
        );

        if ($valor !== null) {
            $datos['boolean'] = $valor;
        } else {
            $mensajes['boolean'] =
                'Debe ser un boolean válido.';
        }

/* EMAIL */

        $email = trim($_POST['email'] ?? '');

        $valor = filter_var(
            $email,
            FILTER_VALIDATE_EMAIL
        );

        if ($valor !== false) {
            $datos['email'] = $valor;
        } else {
            $mensajes['email'] =
                'Email incorrecto.';
        }

/* STRING CON REGEX Y LONGITUD */

        $codigo = trim($_POST['codigo'] ?? '');

             //Una alternativa más compacta (ya que con strings no hay que hacer casteo) sería 
        if($valor = preg_match('/^[0-9][A-Za-z].*$/', $codigo) && strlen($codigo) <= 10) {
            $datos['codigo'] = $valor;
        } else {
            $mensajes['codigo'] = 'Debe empezar por número, seguir con letra y tener como máximo 10 caracteres.';
        }

            //Una alternativa más verbosa (con filter_var) sería:
            /*   
            $valor = filter_var(
                $codigo,
                FILTER_VALIDATE_REGEXP,
                [
                    'options' => [
                        'regexp' => '/^[0-9][A-Za-z].*$/'
                    ]
                ]
            );

            if ($valor !== false && strlen($valor) <= 10) {
                $datos['codigo'] = $valor;
            } else {
                $mensajes['codigo'] = 'Debe empezar por número, seguir con letra y tener como máximo 10 caracteres.';
            } 
            */


/* ARRAY DE ENTEROS */

        $numeros = $_POST['numeros'] ?? [];

        if (is_array($numeros)) {

            $datos['numeros'] = [];

            foreach ($numeros as $numero) {

                $numero = trim($numero);

                $valor = filter_var(
                    $numero,
                    FILTER_VALIDATE_INT
                );

                if ($valor !== false) {
                    $datos['numeros'][] = $valor;
                }
            }

            if (count($datos['numeros']) === 0) {
                $mensajes['numeros'] =
                    'Debe seleccionar al menos un número.';
                unset($datos['numeros']);
            }

        } else {

            $mensajes['numeros'] =
                'Datos incorrectos.';
        }

        
    /* FECHA - VALIDACIÓN BÁSICA (no comprueba la validez del día, mes y año) */
        
        $fecha = trim($_POST['fecha'] ?? '');

        $valor = strtotime($fecha);

        if ($valor !== false) {
            $datos['fecha'] = date('d/m/Y', $valor);
        } else {
            $mensajes['fecha'] = 'Debe ser una fecha con formato YYYY-MM-DD.';
        }


echo "datos:<br>";
var_dump($datos);
echo "<br>mensajes:<br>";
var_dump($mensajes);