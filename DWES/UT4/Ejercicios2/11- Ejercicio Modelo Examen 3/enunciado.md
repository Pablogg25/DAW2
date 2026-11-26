# DESARROLLO WEB EN ENTORNO SERVIDOR | PRUEBA PRÁCTICA
## EXAMEN PRÁCTICO: Gestión de catálogo de componentes de PC con PHP y PDO
*Arquitectura por capas · DAO · Factory · Decorator · Transacciones · MySQL / SQLite / Memoria*

---

## 1. Objetivo

Desarrolla una aplicación web en PHP para gestionar el inventario de una tienda de hardware y componentes de ordenador. La solución deberá aplicar programación orientada a objetos y una arquitectura por capas, incorporando patrones de diseño relacionados con el acceso a datos.

Cada componente (`Componente`) tendrá los siguientes atributos:

* `id`
* `nombre`
* `precio`

---

## 2. Funcionalidad obligatoria

La aplicación deberá permitir realizar las siguientes operaciones sobre los componentes:

* Consultar y mostrar todos los componentes.
* Dar de alta un componente indicando su nombre y precio.
* Modificar los datos de un componente existente.
* Eliminar un componente.

---

## 3. Operación especial: «Sustituir componente»

Además del CRUD básico, implementa una operación denominada **«Sustituir componente»**. Recibirá el nombre del componente descatalogado que se desea retirar (`nombreAntiguo`) y los datos del nuevo componente de reemplazo (`nombreNuevo` y `precio`).

La operación deberá ejecutar, en este orden, las siguientes acciones:

1. Eliminar el componente antiguo buscando por su nombre (si no existe ninguno con ese nombre, se lanzará una excepción).
2. Insertar el nuevo componente con su nombre y precio.

**Condición imprescindible:** ambas acciones deben formar parte de una única transacción. Si cualquiera de ellas falla, se ejecutará un `rollBack()` y la base de datos conservará exactamente el estado previo a la operación. Si ambas finalizan correctamente, se confirmarán los cambios mediante `commit()`.

### Ejemplo de comportamiento

| Situación inicial | Después de sustituir *GTX 1660 Super* por *RTX 4060* (329,90 €) |
| :--- | :--- |
| 1. Ryzen 5 5600X — 145,00 € | 1. Ryzen 5 5600X — 145,00 € |
| 2. GTX 1660 Super — 210,00 € | 3. RTX 4060 — 329,90 € |

---

## 4. Organización y arquitectura del proyecto

Organiza la aplicación siguiendo una arquitectura de tres capas, con responsabilidades claramente separadas:

| PRESENTACIÓN | NEGOCIO | ACCESO A DATOS |
| :--- | :--- | :--- |
| Interfaz y recepción de las acciones del usuario. | Lógica de negocio y coordinación de las operaciones. | Lectura y escritura de los datos. |

La capa de presentación deberá comunicarse con la capa de negocio y no acceder directamente a los mecanismos internos de almacenamiento.

Como referencia, utiliza la siguiente estructura de carpetas y archivos:

```text
proyecto_componentes/
├── index.php
├── log.txt
├── config/
│   ├── configuracion.php
│   ├── FactoriaAplicacion.php
│   ├── crearBD_mysql.sql
│   └── crearBD_sqlite.sql
├── datos/
│   ├── ConexionBD.php
│   ├── ComponenteDAO.php
│   ├── ComponenteMemoriaDAO.php
│   ├── ComponentePDODAO.php
│   └── ComponenteDAOLog.php
├── entidades/
│   └── Componente.php
├── negocio/
│   └── ComponenteService.php
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
* Crear la clase `Componente` que represente la entidad del dominio, con los atributos públicos `id`, `nombre` y `precio`.
* Definir la interfaz `ComponenteDAO` deduciendo las firmas exactas de los métodos a partir de la plantilla entregada en `datos/ComponenteMemoriaDAO.php` e `index.php`.
* Hacer que `ComponenteService` dependa de la interfaz `ComponenteDAO` y no de una implementación concreta.

### 5.2. Distintas implementaciones del DAO
* `ComponenteMemoriaDAO`: completar los `TODO` de la plantilla entregada. Almacena los componentes en arrays en memoria durante la ejecución del script y no persiste entre peticiones HTTP.
* `ComponentePDODAO`: utiliza `PDO` con sentencias preparadas y `ERRMODE_EXCEPTION` para almacenar los datos en base de datos, ejecutando la sustitución dentro de una transacción real.

### 5.3. Servicio de negocio y patrón Factory
* Crear `ComponenteService` para centralizar la lógica de negocio y validaciones (nombre no vacío, precio mayor o igual que 0). La presentación interactuará únicamente con este servicio.
* Incorporar `FactoriaAplicacion` para crear y ensamblar `ComponenteService` junto con la implementación de `ComponenteDAO` decorada.

### 5.4. Conexión y configuración
* Centralizar la creación de conexiones en `ConexionBD` mediante un método estático (`conectar()`).
* Centralizar en `config/configuracion.php` la selección del DAO (`TIPO_DAO`: `"PDO"` o `"MEMORIA"`), del motor (`MOTOR`: `"SQLITE"` o `"MYSQL"`) y los parámetros de conexión.
* Permitir cambiar entre `SQLite`, `MySQL` y `Memoria` modificando únicamente `config/configuracion.php`.

### 5.5. Presentación e inicialización
* Para `PDO`, utilizar `presentacion/vista.php` con formularios HTML y patrón Post/Redirect/Get (PRG).
* Para `MEMORIA`, utilizar `presentacion/vistaMemoria.php`, ejecutando una secuencia programada de operaciones (alta, consulta, modificación, borrado y sustitución) sin sesiones.
* Implementar `scripts/inicializarBD.php` para generar las tablas y cargar los datos iniciales según el motor configurado (`SQLite` o `MySQL`).

### 5.6. Patrón Decorator: registro de operaciones
* Implementar `ComponenteDAOLog` como decorador de `ComponenteDAO`, registrando en `log.txt` las operaciones de escritura (alta, modificación, borrado, sustitución y errores) con fecha, hora y datos identificativos del componente.

---

## 6. Criterios de valoración

* Funcionamiento correcto de las operaciones CRUD.
* Correcta implementación de la transacción y recuperación ante errores (`rollBack()`).
* Uso adecuado de programación orientada a objetos y separación en capas.
* Diseño e implementación del patrón DAO y deducción de su interfaz.
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
CREATE DATABASE IF NOT EXISTS dwes_componentes
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE dwes_componentes;

DROP TABLE IF EXISTS componentes;

CREATE TABLE componentes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
) ENGINE=InnoDB;

INSERT INTO componentes (nombre, precio) VALUES
('Ryzen 5 5600X', 145.00),
('GTX 1660 Super', 210.00),
('SSD NVMe 1TB', 68.50);
```

### `config/crearBD_sqlite.sql`

```sql
DROP TABLE IF EXISTS componentes;

CREATE TABLE componentes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL
);

INSERT INTO componentes (nombre, precio) VALUES
('Ryzen 5 5600X', 145.00),
('GTX 1660 Super', 210.00),
('SSD NVMe 1TB', 68.50);
```

---

## Anexo II. Ficheros base entregados para el examen

### `datos/ComponenteMemoriaDAO.php`

```php
<?php

// -------------------------------------------- TODO: require/s necesario/s

class ComponenteMemoriaDAO // -----------------------TODO: implement/s necesario/s
{
    private array $componentes = [];

    /** Último id asignado (simula el AUTO_INCREMENT de la BD) */
    private int $ultimoId = 0;

    // -------------------------------------------- TODO: firma del método para obtener todos los componentes
    {
        return array_values($this->componentes);
    }

    // ------------------------------------------- TODO: firma del método para obtener un componente por id
    {

        foreach ($this->componentes as$componente) {

            if ($componente->id ==$id) {
                return $componente;
            }

        }

        return null;
    }

    // ----------------------------------------- TODO: firma del método para insertar un componente
    {

        // Si no trae id (0), se le asigna el siguiente, como haría la BD
        if ($componente->id <= 0) {
            $componente->id =$this->ultimoId + 1;
        }

        $this->ultimoId = max($this->ultimoId,$componente->id);

        $this->componentes[] =$componente;
    }

    // ----------------------------------------- TODO: firma del método para actualizar un componente
    {

        foreach ($this->componentes as $i =>$c) {

            if ($c->id ==$componente->id) {

                $this->componentes[$i] =$componente;
                return;
            }

        }
    }

    // ----------------------------------------- TODO: firma del método para borrar un componente
    {

        $this->componentes = array_filter($this->componentes,
            fn($c) => $c->id !=$id
        );
    }

    /**
     * Sustitución "transaccional" en memoria (Simulado):
     */
    // --------------------------------------- TODO: firma del método para sustituir un componente por nombre
    {

        // COMENZAR TRANSACCIÓN SIMULADA: copia del estado (clonamos los objetos para que una
        // modificación posterior no altere la copia de seguridad)
        $copiaComponentes = array_map(
            fn($c) => clone $c,$this->componentes
        );
        $copiaUltimoId =$this->ultimoId;

        try {

            // 1) Eliminar el componente antiguo
            $antes = count($this->componentes);

            $this->componentes = array_filter($this->componentes,
                fn($c) => $c->nombre !==$nombreAntiguo
            );

            if (count($this->componentes) ===$antes) {

                throw new RuntimeException(
                    "No existe ningún componente con nombre '"
                    . $nombreAntiguo
                    . "'"
                );
            }

            // 2) Insertar el componente nuevo
            $this->insertar($nuevo);

            // CONFIRMACIÓN DE TRANSACCIÓN: no hay que hacer nada, el estado ya es el definitivo

        } catch (Throwable $e) {

            // RECHAZO DE TRANSACCIÓN: se restaura el estado anterior
            $this->componentes =$copiaComponentes;
            $this->ultimoId =$copiaUltimoId;

            throw $e;
        }
    }
}
```

### `index.php`

```php
<?php

// requires

// crear el service

$error = null;
$mensaje = null;

if (isset($_GET['sustituido'])) {$mensaje = 'Componente sustituido correctamente.';
}

/*
 * INSERT
 */
if (isset($_POST['insertar'])) {
    $componente = new Componente( 0,$_POST['nombre'],
        (float) $_POST['precio']
    );

    // Alta de componente

    header('Location: index.php');
    exit();
}

/*
 * UPDATE
 */
if (isset($_POST['actualizar'])) {$componente = new Componente(
        (int) $_POST['id'],$_POST['nombre'],
        (float) $_POST['precio']
    );

    // Actualización de componente

    header('Location: index.php');
    exit();
}

/*
 * DELETE
 */
if (isset($_POST['borrar'])) {
    // Borrado de componente

    header('Location: index.php');
    exit();
}

/*
 * SUSTITUIR (borrar + insertar en una transacción)
 */
if (isset($_POST['sustituir'])) {
    try {
        /*
         * Llamada al servicio para sustituir componente:
         * $_POST['nombreAntiguo'], $_POST['nombreNuevo'], (float)$_POST['precio']
         */
        header('Location: index.php?sustituido=1');
        exit();
    } catch (Throwable $e) {
        // Se ha hecho rollback: los datos siguen como antes.
        // No redirigimos para poder mostrar el motivo del error.
        $error = 'No se pudo sustituir el componente '
            . '(se deshicieron los cambios): '
            . $e->getMessage();
    }
}

/*
 * READ
 */

// Obtener componentes ($componentes)

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
    <title>CRUD Componentes PC</title>
</head>

<body>

    <h1>CRUD Componentes PC</h1>

    <?php if (!empty($mensaje)): ?>
        <p style="color: green;"><strong><?= htmlspecialchars($mensaje) ?></strong></p>
    <?php endif; ?>

    <?php if (!empty($error)): ?>
        <p style="color: red;"><strong><?= htmlspecialchars($error) ?></strong></p>
    <?php endif; ?>

    <h2>Nuevo componente</h2>

    <form action="index.php" method="post">

        <label>
            Nombre:
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

    <h2>Sustituir componente</h2>

    <p>
        Elimina el componente indicado e inserta el nuevo en una única
        transacción: si algo falla, no se modifica nada.
    </p>

    <form action="index.php" method="post">

        <label>
            Nombre del componente a sustituir:
            <input
                type="text"
                name="nombreAntiguo"
                required>
        </label>

        <br><br>

        <label>
            Nombre del nuevo componente:
            <input
                type="text"
                name="nombreNuevo"
                required>
        </label>

        <br><br>

        <label>
            Precio del nuevo componente:
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

    <h2>Listado de componentes</h2>

    <table border="1" cellpadding="5">

        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Actualizar</th>
            <th>Borrar</th>
        </tr>

        <?php foreach ($componentes as$componente): ?>

            <tr>

                <form action="index.php" method="post">

                    <td>
                        <?= $componente->id ?>

                        <input
                            type="hidden"
                            name="id"
                            value="<?= $componente->id ?>">
                    </td>

                    <td>
                        <input
                            type="text"
                            name="nombre"
                            value="<?= htmlspecialchars($componente->nombre) ?>"
                            required>
                    </td>

                    <td>
                        <input
                            type="number"
                            name="precio"
                            step="0.01"
                            value="<?= $componente->precio ?>"
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
    <title>Prueba DAO en Memoria - Componentes PC</title>
</head>

<body>

    <h1>Ejecución en Memoria (sin persistencia entre peticiones)</h1>

    <p>
        En modo <strong>MEMORIA</strong>, cada petición HTTP crea una nueva instancia de
        <code>ComponenteMemoriaDAO</code>.
    </p>

    <?php
    // TODO: Ejecutar aquí sobre $service la secuencia completa de prueba:
    // 1. Insertar varios componentes iniciales ('Ryzen 5 5600X', 'GTX 1660 Super', 'SSD NVMe 1TB')
    // 2. Listar y mostrar la tabla inicial
    // 3. Modificar un componente existente y mostrar el resultado
    // 4. Sustituir 'GTX 1660 Super' por 'RTX 4060' (329.90) y provocar también una sustitución fallida (try/catch)
    // 5. Borrar un componente y mostrar la tabla final
    ?>

</body>

</html>
```