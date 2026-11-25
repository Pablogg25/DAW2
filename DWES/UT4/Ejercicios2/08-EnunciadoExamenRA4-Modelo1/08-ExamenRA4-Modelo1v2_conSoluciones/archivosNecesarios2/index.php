<?php

// ------------------------------------ TODO: require/s necesario/s


// ------------------------------------ TODO: crear el service

/*****************
 * INSERT
 *****************/
if (isset($_POST["insertar"])) {

    $producto = new Producto(
        0,
        $_POST["nombre"],
        (float) $_POST["precio"]
    );

    // ------------------------------- TODO: Alta de producto


    header("Location: index.php");
    exit();
}

/*****************
 * UPDATE
 *****************/
if (isset($_POST["actualizar"])) {

    $producto = new Producto(
        (int) $_POST["id"],
        $_POST["nombre"],
        (float) $_POST["precio"]
    );

    // ---------------------------- TODO: Actualización de producto


    header("Location: index.php");
    exit();
}

/*****************
 * DELETE
 *****************/
if (isset($_POST["borrar"])) {

// ------------------------------------ TODO: Borrado de producto


    header("Location: index.php");
    exit();
}

/*****************
 * TRANSACCION (reemplazar producto: borrar + insertar)
 *
 * Los datos están fijados en el código (hardcodeados):
 *   sustituye el producto "Ratón" por "Ratón Gaming" (25 €).
 *
 * PRECONDICIÓN antes de pulsar el botón:
 *   debe existir en la base de datos un producto cuyo nombre sea
 *   exactamente "Ratón".
 *
 * Si NO se cumple (por ejemplo, porque ya se ejecutó una vez y el
 * producto "Ratón" ya no existe), la capa de datos lanza una
 * excepción, hace ROLLBACK (no se modifica nada) y aquí se captura
 * para que la página no se rompa: se recarga la lista sin cambios.
 *****************/
if (isset($_POST["transaccion"])) {

    try {

        // ------------------------------------ TODO: invocar transacción con valores hardcodeados


    } catch (Throwable $e) {

        // Precondición no cumplida o fallo en la transacción:
        // ya se ha hecho rollback, no hay nada más que deshacer.
    }

    header("Location: index.php");
    exit();
}

/*****************
 * READ
 *****************/
// ---------------------------------- TODO:Obtener productos

// ---------------------------------- TODO: require de la vista