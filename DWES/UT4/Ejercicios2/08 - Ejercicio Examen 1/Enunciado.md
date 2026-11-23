Práctica modelo de examen UT04 – Acceso a Datos (Groucho Bank)
Una sola tabla · MySQL Workbench · Tiempo orientativo: 2 horas · 10 puntos
Contexto
La empresa Groucho Bank necesita una aplicación web interna para gestionar sus cuentas bancarias y realizar transferencias entre ellas.
La aplicación permitirá:
• Gestionar cuentas (CRUD completo).
• Realizar transferencias de dinero entre dos cuentas.
• Mantener un historial de operaciones mediante un decorador de log.
1. Infraestructura de datos
La aplicación utilizará la base de datos dwes_practica_banco, que contiene una única tabla: cuentas.
1.1. Cómo crearla desde MySQL Workbench
1.  Abre MySQL Workbench y conéctate a tu servidor local (usuario root).
2.  Comprueba la versión con SELECT VERSION();. Necesitas MySQL 8.0.16 o superior (o MariaDB 10.2.1 o superior) para que se aplique el CHECK de la tabla.
3.  Menú File > Open SQL Script y abre 01_crear_bd.sql. Pulsa el rayo (Execute).
4.  Abre 02_poblar_datos.sql y ejecútalo.
5.  En el panel izquierdo, pulsa el botón de refrescar de SCHEMAS y comprueba que aparece dwes_practica_banco con la tabla cuentas.
6.  Verifica los datos con SELECT * FROM dwes_practica_banco.cuentas; (deben salir 6 filas).
Puedes repetir el paso 4 cuando quieras para devolver los datos a su estado inicial. El script opcional 03_usuario_opcional.sql crea un usuario propio para la aplicación. Si trabajas con root, no lo necesitas.
1.2. Esquema de la tabla
Columna
Tipo
Restricciones
id
INT UNSIGNED
AUTO_INCREMENT, clave primaria
iban
VARCHAR(24)
NOT NULL, UNIQUE
titular
VARCHAR(100)
NOT NULL
saldo
DECIMAL(12,2)
NOT NULL, DEFAULT 0.00, CHECK (saldo >= 0)
estado
ENUM('ACTIVA','BLOQUEADA')
NOT NULL, DEFAULT 'ACTIVA'
created_at
TIMESTAMP
DEFAULT CURRENT_TIMESTAMP
1.3. Datos iniciales
id
iban
titular
saldo
estado
1
ES1000000000000000000001
Lucía Fernández
2500.00
ACTIVA
2
ES1000000000000000000002
Marcos Ortiz
150.75
ACTIVA
3
ES1000000000000000000003
Elena Navarro
0.00
ACTIVA
4
ES1000000000000000000004
Pablo Ruiz
980.00
BLOQUEADA
5
ES1000000000000000000005
Sara Molina
12000.50
ACTIVA
6
ES1000000000000000000006
Javier Prieto
45.20
ACTIVA
2. Estructura de la aplicación
Se deberá utilizar obligatoriamente una arquitectura por capas similar a la trabajada en clase.
proyecto_banco/
├── App/
│   └── Clases/
│       ├── ConexionBD.php
│       ├── FactoriaAplicacion.php
│       ├── entidades/
│       │   └── Cuenta.php
│       ├── dao/
│       │   ├── CuentaDAO.php
│       │   ├── CuentaPDODAO.php
│       │   └── CuentaDAOLog.php
│       └── services/
│           └── CuentaService.php
├── config/
│   └── configuracion.php
├── public/
│   ├── index.php
│   ├── cuentas.php
│   └── transferencia.php
├── scripts/
│   └── inicializarBD.php
├── sql/
│   ├── 01_crear_bd.sql
│   └── 02_poblar_datos.sql
└── log.txt        (lo genera la aplicación)
IMPORTANTE: el nombre de cada archivo debe coincidir exactamente, incluidas las mayúsculas, con el que uses en los require_once. En Windows y macOS no se nota, pero en Linux falla.
3. Requisitos técnicos
La solución debe utilizar:
• PDO con ERRMODE_EXCEPTION.
• Sentencias preparadas en todas las consultas con datos variables.
• Arquitectura por capas: presentación (public/), negocio (services/) y datos (dao/).
• Patrón DAO: interfaz CuentaDAO e implementación CuentaPDODAO.
• Patrón Factory: FactoriaAplicacion (método de instancia que crea el servicio) y ConexionBD (método estático que crea la conexión).
• Inyección de dependencias: la conexión se inyecta en el DAO y el DAO en el Service, siempre por constructor.
• Patrón Decorator: CuentaDAOLog.
• Transacciones PDO en la transferencia.
• Escapar con htmlspecialchars todo dato que se imprima en HTML.
• Patrón Post/Redirect/Get tras cada alta, modificación o borrado.
• Los datos de conexión (host, base de datos, usuario, contraseña) estarán en config/configuracion.php, nunca escritos dentro de ConexionBD.
4. Gestión de cuentas (6 puntos)
Se desarrollará la página cuentas.php.
4.1. Listado (1 punto)
Se mostrarán todas las cuentas ordenadas por titular, con: ID, IBAN, titular, saldo (formato 1.234,56 €) y estado.
4.2. Alta (1 punto)
Permitir crear cuentas con IBAN, titular y saldo inicial. El estado de una cuenta nueva es siempre ACTIVA.
4.3. Modificación (2 puntos)
Permitir modificar únicamente el titular y el estado de una cuenta existente. El IBAN y el saldo no se pueden modificar desde esta pantalla: el saldo solo cambia mediante transferencias.
4.4. Borrado (1 punto)
Permitir eliminar una cuenta.
4.5. Arquitectura (1 punto)
La lógica de negocio deberá estar desacoplada del acceso a datos mediante CuentaDAO, CuentaService y FactoriaAplicacion. Las páginas de public/ no pueden contener SQL ni conocer la clase CuentaPDODAO.
4.6. Reglas de negocio (se aplican en CuentaService)
Operación
Regla
Si no se cumple
Alta
El titular es obligatorio (sin espacios sobrantes) y tiene como máximo 100 caracteres.
Excepción con mensaje
Alta
El IBAN tiene el formato ES seguido de 22 dígitos.
Excepción con mensaje
Alta
No puede existir otra cuenta con el mismo IBAN.
Excepción con mensaje
Alta
El saldo inicial no puede ser negativo.
Excepción con mensaje
Modificación
El titular sigue siendo obligatorio. La cuenta debe existir.
Excepción con mensaje
Borrado
No se puede borrar una cuenta con saldo mayor que 0. La cuenta debe existir.
Excepción con mensaje
Las páginas capturarán estas excepciones y mostrarán el mensaje al usuario sin que la aplicación se rompa.
5. Transferencias (3 puntos)
Se desarrollará la página transferencia.php.
5.1. Selección de cuentas (0,5 puntos)
• El desplegable de origen muestra solo las cuentas ACTIVA con saldo mayor que 0.
• El desplegable de destino muestra solo las cuentas ACTIVA.
En cada opción se verá el titular, el IBAN y el saldo actual.
5.2. Datos de la transferencia (0,5 puntos)
El formulario solicitará: cuenta origen, cuenta destino e importe.
5.3. Validación (0,5 puntos)
Se validará en CuentaService, antes de tocar la base de datos:
• El importe debe ser mayor que 0.
• Origen y destino deben ser cuentas distintas.
• Ambas cuentas deben existir y estar ACTIVA.
• El importe no puede superar el saldo de la cuenta origen.
5.4. Transacción (1,5 puntos)
La transferencia se ejecutará mediante una transacción PDO dentro de CuentaPDODAO::transferir(int $origenId, int $destinoId, float $importe): void. Este método forma parte de la interfaz CuentaDAO.
Una transferencia implica dos operaciones sobre la misma tabla que deben realizarse conjuntamente.
Operación 1: restar el importe al origen.
UPDATE cuentas
SET saldo = saldo - ?
WHERE id = ?;
Operación 2: sumar el importe al destino.
UPDATE cuentas
SET saldo = saldo + ?
WHERE id = ?;
Restricción: si cualquiera de las dos operaciones falla, rollBack(); si ambas terminan correctamente, commit(). En el catch se debe comprobar inTransaction() antes de hacer rollBack() y relanzar la excepción para que la página muestre el error.
6. Decorador de log (1 punto)
La aplicación incorporará el decorador CuentaDAOLog, que implementa la misma interfaz que el DAO real y registra las operaciones en el fichero log.txt, en la raíz del proyecto.
Deben registrarse: altas, modificaciones, borrados y transferencias. Las lecturas no se registran.
Ejemplo de salida:
2026-11-22 10:15:20 - ALTA CUENTA: Ana Torres
2026-11-22 10:18:11 - MODIFICACION CUENTA ID=2
2026-11-22 10:20:02 - TRANSFERENCIA 50.00 EUR CUENTA ID=1 -> CUENTA ID=2
2026-11-22 10:22:45 - BORRADO CUENTA ID=3
El decorador lo aplica siempre FactoriaAplicacion, de forma que ni el Service ni las páginas saben que existe.
7. Resumen de patrones requeridos
Patrón
Uso
DAO
Acceso a datos de cuentas (interfaz + implementación PDO)
Factory (instancia)
FactoriaAplicacion crea el servicio
Factory (estática)
ConexionBD::conectar() crea la conexión PDO
Inyección de dependencias
Conexión en el DAO y DAO en el Service, por constructor
Decorator
Registro de operaciones en log.txt
Transacciones
Transferencia entre cuentas
8. Rúbrica
Apartado
Puntos
4.1 Listado
1
4.2 Alta
1
4.3 Modificación
2
4.4 Borrado
1
4.5 Arquitectura
1
5.1 Selección de cuentas
0,5
5.2 Datos de la transferencia
0,5
5.3 Validación
0,5
5.4 Transacción
1,5
6 Decorador de log
1
Total
10
9. Pruebas de aceptación
Antes de darlo por terminado, comprueba cada punto:
1.  cuentas.php muestra las 6 cuentas con el saldo formateado.
2.  Alta con IBAN ES1000000000000000000001 falla por IBAN repetido y no se crea nada.
3.  Alta con IBAN 12345 falla por formato. Alta con titular vacío falla.
4.  Alta con el titular <b>prueba</b> se muestra como texto literal, sin negrita.
5.  Recargar la página justo después de un alta no duplica la cuenta.
6.  Modificar el titular y el estado de la cuenta 3 funciona, y el saldo no cambia.
7.  Borrar la cuenta 1 (saldo 2500) es rechazado. Borrar la cuenta 3 (saldo 0) funciona.
8.  En transferencia.php, la cuenta 4 (BLOQUEADA) no aparece en ningún desplegable. La cuenta 3 (saldo 0) no aparece en origen.
9.  Transferir 100 € de la cuenta 1 a la 2: los saldos pasan a 2400,00 y 250,75.
10.  Transferir 100 € de la cuenta 6 (45,20 €) es rechazado por saldo insuficiente y no cambia ningún saldo.
11.  Transferir de una cuenta a sí misma, o con importe 0 o negativo, es rechazado.
12.  log.txt contiene una línea por cada alta, modificación, borrado y transferencia, y ninguna por los listados.
13.  Prueba del rollBack(): rompe a propósito la segunda sentencia SQL (por ejemplo, escribe saldoo en vez de saldo), haz una transferencia y comprueba que el primer UPDATE no ha quedado aplicado. Después arréglala.
14.  Prueba de la red de seguridad de la base de datos: desactiva temporalmente la validación del saldo en el Service y transfiere más de lo que hay. El CHECK (saldo >= 0) debe hacer fallar la operación y la transacción debe deshacerlo todo.
15.  Con iban o titular escritos con comillas simples, la aplicación sigue funcionando (consultas preparadas).
10. Pistas y errores típicos
• DECIMAL llega de PDO como texto: conviértelo con (float) al construir la entidad.
• Las reglas de negocio van en el Service, no en el DAO ni en las páginas. El DAO solo guarda y lee, y el Service no debe conocer PDO.
• El DAO se declara con implements CuentaDAO y debe escribir todos los métodos de la interfaz. Lo mismo el decorador.
• El decorador recibe un CuentaDAO (la interfaz), no CuentaPDODAO.
• Para comprobar que una cuenta existe antes de operar, usa un método obtenerPorId que devuelva ?Cuenta.
• Para comprobar un IBAN repetido necesitarás un método extra en la interfaz, por ejemplo obtenerPorIban(string $iban): ?Cuenta. Si lo añades, recuerda implementarlo también en el decorador.
• En scripts/inicializarBD.php la conexión se hace sin indicar dbname (la base de datos todavía puede no existir), igual que en el ejemplo del examen anterior.
• Captura Exception en las páginas (reglas de negocio) y no muestres nunca el mensaje técnico de PDOException al usuario.
• Revisa que ningún echo imprime datos sin pasar por htmlspecialchars.
11. Ampliaciones opcionales (no puntúan, para practicar)
1.  Ingreso y reintegro: una operación simple sobre el saldo de una cuenta, con su regla de negocio (no se puede sacar más de lo que hay) y su línea de log.
2.  Buscador por titular con LIKE y consulta preparada, añadiendo el método a la interfaz y al decorador.
3.  DAO en memoria: crea CuentaMemoriaDAO y la constante TIPO_DAO en la configuración para que FactoriaAplicacion elija entre PDO y memoria. Comprueba qué pasa con los datos entre peticiones y por qué.
4.  Bloqueo de lectura: dentro de la transacción, lee las dos cuentas con SELECT ... FOR UPDATE para evitar que otra petición modifique el saldo entre la validación y la actualización.
5.  Log de errores: haz que el decorador registre también las transferencias rechazadas.
6.  Página de inicio (index.php) con un enlace a cada módulo y el saldo total del banco.
Anexo A. Script 01_crear_bd.sql
CREATE DATABASE IF NOT EXISTS dwes_practica_banco
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE dwes_practica_banco;

DROP TABLE IF EXISTS cuentas;

CREATE TABLE cuentas (
    id          INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
    iban        VARCHAR(24)   NOT NULL,
    titular     VARCHAR(100)  NOT NULL,
    saldo       DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    estado      ENUM('ACTIVA','BLOQUEADA') NOT NULL DEFAULT 'ACTIVA',
    created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_cuentas_iban UNIQUE (iban),
    CONSTRAINT chk_cuentas_saldo_no_negativo CHECK (saldo >= 0)
) ENGINE=InnoDB;
Anexo B. Script 02_poblar_datos.sql
USE dwes_practica_banco;

TRUNCATE TABLE cuentas;

INSERT INTO cuentas (iban, titular, saldo, estado) VALUES
('ES1000000000000000000001', 'Lucía Fernández', 2500.00,  'ACTIVA'),
('ES1000000000000000000002', 'Marcos Ortiz',     150.75,  'ACTIVA'),
('ES1000000000000000000003', 'Elena Navarro',      0.00,  'ACTIVA'),
('ES1000000000000000000004', 'Pablo Ruiz',       980.00,  'BLOQUEADA'),
('ES1000000000000000000005', 'Sara Molina',    12000.50,  'ACTIVA'),
('ES1000000000000000000006', 'Javier Prieto',     45.20,  'ACTIVA');