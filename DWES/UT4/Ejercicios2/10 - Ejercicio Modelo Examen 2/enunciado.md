# DESARROLLO WEB EN ENTORNO SERVIDOR | PRUEBA PRÁCTICA
## EXAMEN PRÁCTICO: Gestión de catálogo de motocicletas con PHP y PDO
*Arquitectura por capas · DAO · Factory · Decorator · Transacciones · MySQL / SQLite / Memoria*

---

## 1. Objetivo

Desarrolla una aplicación web en PHP para gestionar el catálogo de motocicletas de un concesionario especializado. La solución deberá aplicar programación orientada a objetos y una arquitectura por capas, incorporando patrones de diseño relacionados con el acceso a datos.

Cada motocicleta (`Moto`) tendrá los siguientes atributos:

* `id`
* `modelo`
* `precio`

---

## 2. Funcionalidad obligatoria

La aplicación deberá permitir realizar las siguientes operaciones sobre las motocicletas:

* Consultar y mostrar todas las motocicletas.
* Dar de alta una motocicleta indicando su modelo y precio.
* Modificar los datos de una motocicleta existente.
* Eliminar una motocicleta.

---

## 3. Operación especial: «Sustituir moto»

Además del CRUD básico, implementa una operación denominada **«Sustituir moto»**. Recibirá el modelo de la motocicleta que se desea retirar (`modeloAntiguo`), el modelo de la nueva motocicleta (`modeloNuevo`) y su precio (`precio`).

La operación deberá ejecutar, en este orden, las siguientes acciones:

1. Eliminar la motocicleta antigua buscando por su modelo (si no existe, se lanzará una excepción).
2. Insertar la nueva motocicleta con su modelo y precio.

**Condición imprescindible:** ambas acciones deben formar parte de una única transacción. Si cualquiera de ellas falla, se ejecutará un `rollBack()` y la base de datos conservará exactamente el estado previo a la operación. Si ambas finalizan correctamente, se confirmarán los cambios mediante `commit()`.

### Ejemplo de comportamiento

| Situación inicial | Después de sustituir *KTM 300 EXC* por *GasGas EC 300* (8.100,00 €) |
| :--- | :--- |
| 1. TM EN 125 2T — 4.200,00 € | 1. TM EN 125 2T — 4.200,00 € |
| 2. KTM 300 EXC — 7.850,00 € | 3. GasGas EC 300 — 8.100,00 € |

---

## 4. Organización y arquitectura del proyecto

Organiza la aplicación siguiendo una arquitectura de tres capas, con responsabilidades claramente separadas:

| PRESENTACIÓN | NEGOCIO | ACCESO A DATOS |
| :--- | :--- | :--- |
| Interfaz y recepción de las acciones del usuario. | Lógica de negocio y coordinación de las operaciones. | Lectura y escritura de los datos. |

La capa de presentación deberá comunicarse con la capa de negocio y no acceder directamente a los mecanismos internos de almacenamiento.

Como referencia, utiliza la siguiente estructura de carpetas y archivos:

```text
proyecto_motos/
├── index.php
├── log.txt
├── config/
│   ├── configuracion.php
│   ├── FactoriaAplicacion.php
│   ├── crearBD_mysql.sql
│   └── crearBD_sqlite.sql
├── datos/
│   ├── ConexionBD.php
│   ├── MotoDAO.php
│   ├── MotoMemoriaDAO.php
│   ├── MotoPDODAO.php
│   └── MotoDAOLog.php
├── entidades/
│   └── Moto.php
├── negocio/
│   └── MotoService.php
├── presentacion/
│   ├── vista.php
│   └── vistaMemoria.php
└── scripts/
    └── inicializarBD.php
```

---

## 5. Aspectos de diseño que se valorarán

Los siguientes aspectos amplían la solución básica y se valorarán de forma independiente y acumulativa:

### 5.1. Entidad y patrón DAO
* Crear una clase `Moto` que represente la entidad del dominio, con los atributos públicos `id`, `modelo` y `precio`.
* Definir una interfaz `MotoDAO` que establezca las operaciones de acceso a datos (`listAll`, `byId`, `save`, `update`, `delete` y `sustituirMoto`).
* Hacer que la capa de negocio (`MotoService`) dependa de la interfaz `MotoDAO` y no de una implementación concreta.

### 5.2. Distintas implementaciones del DAO
* `MotoMemoriaDAO`: almacena las motocicletas en arrays precargados en su constructor. Los datos solo se mantienen durante la ejecución del script y no persisten entre peticiones HTTP.
* `MotoPDODAO`: utiliza `PDO` con sentencias preparadas y `ERRMODE_EXCEPTION` para almacenar los datos de forma persistente en una base de datos, ejecutando `sustituirMoto` dentro de una transacción.

### 5.3. Servicio de negocio y patrón Factory
* Crear `MotoService` para centralizar la lógica de negocio y las validaciones (modelo no vacío, precio no negativo, existencia de la moto a sustituir). La presentación deberá interactuar con la aplicación únicamente a través de este servicio.
* Incorporar una `FactoriaAplicacion` que cree y configure los objetos necesarios (`MotoService` y la implementación de `MotoDAO` decorada), ensamblando sus dependencias por constructor.

### 5.4. Conexión y configuración
* Centralizar la creación de conexiones en `ConexionBD`, mediante un método estático (`getConexion()`).
* Centralizar en `config/configuracion.php` la selección de la implementación DAO y del motor de base de datos, así como los parámetros de conexión:
  * `TIPO_DAO`: `"PDO"` o `"MEMORIA"`.
  * `MOTOR`: `"SQLITE"` o `"MYSQL"`.
* Permitir que la configuración determine automáticamente la implementación DAO que se utilizará, sin tener que modificar la capa de presentación ni la de negocio.
* Permitir que `MotoPDODAO` funcione con SQLite o MySQL modificando únicamente la configuración, sin cambiar su lógica de acceso a datos.

### 5.5. Presentación e inicialización
* Adaptar la presentación al almacenamiento seleccionado:
  * Para `PDO`, utilizar `presentacion/vista.php` con formularios HTML y patrón Post/Redirect/Get (PRG).
  * Para `MEMORIA`, utilizar `presentacion/vistaMemoria.php`, ejecutando una secuencia de operaciones programadas en el código (alta, consulta, modificación, borrado y sustitución), sin necesidad de sesiones.
* Crear `scripts/inicializarBD.php` para generar las tablas y cargar datos iniciales, utilizando el script SQL correspondiente al motor configurado (`SQLite` o `MySQL`).

### 5.6. Patrón Decorator: registro de operaciones
* Implementar `MotoDAOLog` como decorador del DAO. Deberá implementar `MotoDAO` y añadir funcionalidad sin modificar las clases DAO existentes.
* Registrar en `log.txt` las operaciones de escritura realizadas (alta, modificación, borrado, sustitución y errores), incluyendo fecha y hora, tipo de operación y los datos identificativos de la motocicleta.

---

## 6. Criterios de valoración

* Funcionamiento correcto de las operaciones CRUD.
* Correcta implementación de la transacción y recuperación ante errores (`rollBack()`).
* Uso adecuado de programación orientada a objetos y separación en capas.
* Diseño e implementación del patrón DAO.
* Posibilidad de intercambiar implementaciones DAO (`PDO` / `MEMORIA`).
* Uso de factorías y centralización de la creación de objetos y conexiones.
* Configuración externa y selección del almacenamiento.
* Compatibilidad con SQLite y MySQL.
* Adaptación de la presentación e inicialización de la base de datos.
* Aplicación del patrón Decorator y registro de operaciones en `log.txt`.
* Claridad, calidad y organización del código.

---

## Anexo I. Scripts SQL iniciales (`config/`)

### `config/crearBD_mysql.sql`

```sql
CREATE DATABASE IF NOT EXISTS dwes_motos
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE dwes_motos;

DROP TABLE IF EXISTS motos;

CREATE TABLE motos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(150) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
) ENGINE=InnoDB;

INSERT INTO motos (modelo, precio) VALUES
('TM EN 125 2T', 4200.00),
('KTM 300 EXC', 7850.00),
('Husqvarna TE 250', 7400.00);
```

### `config/crearBD_sqlite.sql`

```sql
DROP TABLE IF EXISTS motos;

CREATE TABLE motos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    modelo TEXT NOT NULL,
    precio REAL NOT NULL
);

INSERT INTO motos (modelo, precio) VALUES
('TM EN 125 2T', 4200.00),
('KTM 300 EXC', 7850.00),
('Husqvarna TE 250', 7400.00);
```

---

## Anexo II. Ficheros base proporcionados para el examen

### `index.php`

```php
<?php

// requires

// crear el service

$error = null;
$mensaje = null;

if (isset($_GET['sustituida'])) {$mensaje = 'Motocicleta sustituida correctamente.';
}

/*
- INSERT
 */
if (isset($_POST['insertar'])) {
    $moto = new Moto( 0,$_POST['nombre'],
        (float) $_POST['precio']
    );

    // Alta de motocicleta

    header('Location: index.php');
    exit();
}

/*
- UPDATE
 */
if (isset($_POST['actualizar'])) {$moto = new Moto(
        (int) $_POST['id'],$_POST['nombre'],
        (float) $_POST['precio']
    );

    // Actualización de motocicleta

    header('Location: index.php');
    exit();
}

/*
- DELETE
 */
if (isset($_POST['borrar'])) {
    // Borrado de motocicleta

    header('Location: index.php');
    exit();
}

/*
- SUSTITUIR (borrar + insertar en una transacción)
 */
if (isset($_POST['sustituir'])) {
    try {
        /*
- "Sustituir moto"(
-     $_POST["modeloAntiguo"],
-     $_POST["modeloNuevo"],
-     (float) $_POST["precio"]
- );
         */
        header('Location: index.php?sustituida=1');
        exit();
    } catch (Throwable $e) {
        // Se ha hecho rollback: los datos siguen como antes.
        // No redirigimos para poder mostrar el motivo del error.
        $error = 'No se pudo sustituir la motocicleta '
            . '(se deshicieron los cambios): '
            . $e->getMessage();
    }
}

/*
- READ
 */

// Obtener motocicletas ($motos)

if (defined('TIPO_DAO') && TIPO_DAO === 'MEMORIA') {
    require __DIR__ . '/presentacion/vistaMemoria.php';
} else {
    require __DIR__ . '/presentacion/vista.php';
}
```

### `presentacion/vista.php`

```php
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>CRUD Motocicletas</title>
</head>

<body>

    <h1>CRUD Motocicletas</h1>

    <?php if (!empty($mensaje)): ?>
        <p style="color: green;"><strong><?= htmlspecialchars($mensaje) ?></strong></p>
    <?php endif; ?>

    <?php if (!empty($error)): ?>
        <p style="color: red;"><strong><?= htmlspecialchars($error) ?></strong></p>
    <?php endif; ?>

    <h2>Nueva motocicleta</h2>

    <form action="index.php" method="post">

        <label>
            Modelo:
            <input
                type="text"
                name="nombre"
                required>
        </label>

        <br><br>

        <label>
            Precio:
            <input
                type="number"
                step="0.01"
                name="precio"
                required>
        </label>

        <br><br>

        <button
            type="submit"
            name="insertar">
            Insertar
        </button>

    </form>

    <hr>

    <h2>Sustituir motocicleta</h2>

    <p>
        Elimina la motocicleta indicada e inserta la nueva en una única
        transacción: si algo falla, no se modifica nada.
    </p>

    <form action="index.php" method="post">

        <label>
            Modelo de la moto a sustituir:
            <input
                type="text"
                name="modeloAntiguo"
                required>
        </label>

        <br><br>

        <label>
            Modelo de la nueva moto:
            <input
                type="text"
                name="modeloNuevo"
                required>
        </label>

        <br><br>

        <label>
            Precio de la nueva moto:
            <input
                type="number"
                step="0.01"
                name="precio"
                required>
        </label>

        <br><br>

        <button
            type="submit"
            name="sustituir">
            Sustituir
        </button>

    </form>

    <hr>

    <h2>Listado de motocicletas</h2>

    <table border="1" cellpadding="5">

        <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Precio</th>
            <th>Actualizar</th>
            <th>Borrar</th>
        </tr>

        <?php foreach ($motos as$moto): ?>

            <tr>

                <form action="index.php" method="post">

                    <td>
                        <?= $moto->id ?>

                        <input
                            type="hidden"
                            name="id"
                            value="<?= $moto->id ?>">
                    </td>

                    <td>
                        <input
                            type="text"
                            name="nombre"
                            value="<?= htmlspecialchars($moto->modelo) ?>"
                            required>
                    </td>

                    <td>
                        <input
                            type="number"
                            name="precio"
                            step="0.01"
                            value="<?= $moto->precio ?>"
                            required>
                    </td>

                    <td>
                        <button
                            type="submit"
                            name="actualizar">
                            Actualizar
                        </button>
                    </td>

                    <td>
                        <button
                            type="submit"
                            name="borrar">
                            Borrar
                        </button>
                    </td>

                </form>

            </tr>

        <?php endforeach; ?>

    </table>

</body>

</html>
```

### `presentacion/vistaMemoria.php`

```php
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Prueba DAO en Memoria - Motocicletas</title>
</head>

<body>

    <h1>Ejecución en Memoria (sin persistencia entre peticiones)</h1>

    <p>
        En modo <strong>MEMORIA</strong>, cada petición HTTP crea una nueva instancia de
        <code>MotoMemoriaDAO</code> con los datos iniciales del constructor.
    </p>

    <h2>1. Catálogo inicial</h2>
    <table border="1" cellpadding="5">
        <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Precio</th>
        </tr>
        <?php foreach ($motos as$moto): ?>
            <tr>
                <td><?= $moto->id ?></td>
                <td><?= htmlspecialchars($moto->modelo) ?></td>
                <td><?= number_format($moto->precio, 2, ',', '.') ?> €</td>
            </tr>
        <?php endforeach; ?>
    </table>

    <hr>

    <h2>2. Secuencia de operaciones en memoria</h2>
    <?php
    // TODO: Ejecutar aquí sobre $service una secuencia de prueba:
    // 1. Alta de una nueva moto (ej. 'Beta RR 300', 7600.00)
    // 2. Modificación de una moto existente
    // 3. Sustitución de una moto existente por otra
    // 4. Borrado de una moto
    // 5. Volver a obtener $motosFinales =$service->... y mostrar la tabla resultante
    ?>

</body>

</html>
```