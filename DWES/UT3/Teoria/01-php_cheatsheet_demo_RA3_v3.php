<?php
/**
 * ============================================================================
 *  DEMO — RA3
 *  "Escribe bloques de sentencias embebidos en lenguajes de marcas,
 *   seleccionando y utilizando las estructuras de programación"
 * ============================================================================
 *  Ejecutar (consola):    php 01-php_cheatsheet_demo_RA3.php
 *  Ejecutar (navegador):  php -S localhost:8000
 *                         y abrir http://localhost:8000/01-php_cheatsheet_demo_RA3.php
 * 
 *  FORMULARIO REAL:       http://localhost:8000/01-php_cheatsheet_demo_RA3.php?form=1
 *
 *  Mapa de contenidos (peso de cada criterio dentro del RA3):
 *    CE 3.1  Decisión (if, switch, match) ........................  5 %  -> sección 1
 *    CE 3.2  Bucles y verificación de su funcionamiento ..........  10 % -> sección 2
 *    CE 3.3  Arrays y su impacto en el rendimiento ...............  20 % -> sección 3
 *    CE 3.4  Funciones ...........................................  20 % -> sección 4
 *    CE 3.5  Formularios web .....................................  20 % -> sección 5
 *    CE 3.6  Recuperar la información del formulario .............  20 % -> sección 6
 *    CE 3.7  Comentarios en el código ............................  5 %  -> sección 7
 *
 *  - Salida en texto plano (echo / var_dump). Ahora SÍ hay funciones propias (sección 4).
 *  - Los formularios necesitan un navegador: en consola se SIMULAN $_GET y $_POST.
 *  - Las marcas [JAVA] señalan diferencias importantes respecto a Java.
 *  - De momento no se trabaja: objetos/clases, archivos, sesiones y $_FILES.
 * ============================================================================
 */

error_reporting(E_ALL);
ini_set('display_errors', '1');

const AFICIONES = ['cine', 'viajes', 'videojuegos'];   // se usa en el formulario real (sección 5/6)

// Modo "formulario real": debe ir ANTES de cualquier salida de texto.
// OJO: formularioReal() se define más abajo y aun así funciona: PHP "eleva" (hoisting)
// las funciones declaradas a nivel superior. Ver sección 4.
if (isset($_GET['form'])) {
    formularioReal();
    exit;
}

header('Content-Type: text/plain; charset=utf-8');   // solo afecta si se ejecuta en un navegador


// ############################################################################
echo "\n===== 1. DECISIÓN: if / switch / match  (CE 3.1) =====\n";
// ############################################################################
// [JAVA] La condición NO tiene que ser boolean: cualquier valor se convierte a bool.

$nota = 7.5;
if ($nota >= 9) {
    $texto = 'Sobresaliente';
} else if ($nota >= 7) {          // "elseif" o "else if" (con llaves son equivalentes; con ":" solo vale elseif)
    $texto = 'Notable';
} elseif ($nota >= 5) {
    $texto = 'Aprobado';
} else {
    $texto = 'Suspenso';
}

echo "if / elseif / else: nota $nota => $texto\n";

$x = 0;
if ($x = 5) {                    // TRAMPA: "=" ASIGNA (y 5 es true). En Java no compila; en PHP sí. Usa === para comparar.
    echo "TRAMPA: if (\$x = 5) asigna y entra siempre; \$x vale ahora $x\n";
}

// Sintaxis alternativa (":" y "endif"): pensada para mezclar PHP con HTML (ver formularioReal()).
if ($nota >= 5):
    echo "Sintaxis alternativa: aprobado\n";
elseif ($nota > 0):
    echo "Sintaxis alternativa: suspenso\n";
else:
    echo "Sintaxis alternativa: error\n";
endif;

$dia = 6;
switch ($dia) {
    case 6:                      // sin break se "cae" al siguiente case (fall-through): útil para agrupar casos
    case 7:
        echo "switch: fin de semana\n";
        break;
    default:
        echo "switch: laborable\n";
}

$valor = '10';
switch ($valor) {                // [JAVA] En PHP switch usa == (comparación FLOJA)
    case 10:
        echo "switch usa == : '10' coincide con 10\n";
        break;
    default:
        echo "switch: no coincide\n";
}
echo 'match usa === : ', match ($valor) { 10 => 'coincide', default => "'10' NO coincide con 10" }, "\n";

// match (PHP 8.0): es una EXPRESIÓN (devuelve valor), compara con ===, no necesita break y no cae al siguiente.
$codigo = 404;
$mensaje = match ($codigo) {
    200, 201 => 'OK',            // varios valores en un mismo brazo
    404      => 'No encontrado',
    500      => 'Error del servidor',
    default  => 'Desconocido',
};
echo "match: $codigo => $mensaje\n";
try {
    echo match (99) { 1 => 'a', 2 => 'b' };     // sin default y sin coincidencia => excepción
} catch (UnhandledMatchError $e) {
    echo 'match sin default: UnhandledMatchError => ', $e->getMessage(), "\n";
}
$edad = 20;
echo 'match (true) para rangos: ', match (true) { $edad < 12 => 'niño', $edad < 18 => 'adolescente', default => 'adulto' }, "\n";
// Ternario, ?: y ?? ya vistos en la chuleta del RA2 (sección "Other operators").


// ############################################################################
echo "\n===== 2. BUCLES: for / while / do-while / foreach  (CE 3.2) =====\n";
// ############################################################################
// [JAVA] En PHP no existe el ámbito de bloque: la variable del bucle SIGUE VIVA al terminar.

echo 'for:      ';
for ($i = 1; $i <= 5; $i++) {
    echo $i, ' ';
}
echo "| tras el bucle \$i sigue existiendo y vale $i\n";

echo 'while:    ';
$n = 3;
while ($n > 0) {
    echo "n=$n ";                // traza: imprimir el valor en cada vuelta es la forma más simple de verificar
    $n--;
}
echo "| al salir n=$n\n";

$k = 10;
do {                             // do-while: el cuerpo se ejecuta AL MENOS una vez
    echo "do-while: se ejecuta 1 vez aunque \$k=$k no cumpla la condición\n";
} while ($k < 5);

for ($i = 0; $i < 0; $i++) {     // caso límite: 0 vueltas (el cuerpo no se ejecuta nunca)
    echo "esto no se imprime\n";
}

echo 'for con varias expresiones: ';
for ($i = 0, $j = 5; $i < $j; $i++, $j--) {
    echo "($i,$j) ";
}
echo "\n";

echo 'continue salta los pares y break sale en 7: ';
for ($i = 1; $i <= 10; $i++) {
    if ($i % 2 === 0) { continue; }
    if ($i === 7)     { break; }
    echo $i, ' ';
}
echo "\n";

echo 'break 2 (sale de los DOS bucles): ';      // tambien funciona con switch dentro de bucle
for ($f = 1; $f <= 3; $f++) {
    for ($c = 1; $c <= 3; $c++) {
        if ($f * $c === 4) { break 2; }
        echo "$f$c ";
    }
}
echo "| al salir f=$f c=$c\n";

echo 'foreach (solo para arrays): ';
$array = [10, 20, 30];
foreach ($array as $valor) {
    echo $valor, ' ';
}
echo "\n";

echo 'sintaxis alternativa (for / endfor): ';
for ($i = 1; $i <= 3; $i++):
    echo $i, ' ';
endfor;
echo "\n";
// Existen también while / endwhile, foreach / endforeach, switch / endswitch.

// --- VERIFICAR que un bucle funciona ---
//  1) ¿La condición de salida llega a cumplirse? (evita bucles infinitos)
//  2) ¿Cuántas vueltas da? (un contador, o una traza con echo)
//  3) ¿Qué pasa en los límites? (0 vueltas, 1 vuelta, última vuelta)
//  4) ¿El resultado coincide con un cálculo conocido? usar fórmula para comprobar: por ejemplo: 
            /* $suma = 0;
            for ($i = 1; $i <= 100; $i++) {
                $suma += $i;
            } */

$vueltas = 0;
for ($x = 0.0; $x < 1.0; $x += 0.1) {
    $vueltas++;
    echo "x=$x ";  // traza: imprimir el valor en cada vuelta es la forma más simple de verificar
}
printf("(%.16f)\n", $x);
echo "TRAMPA: for con float de 0.0 a <1.0 en pasos de 0.1 da $vueltas vueltas (se esperaban 10). Usar contadores enteros.\n";


// ############################################################################
echo "\n===== INCLUDE Y REQUIRE ======\n";
// include da warning si falla, require da error y se interrumpe la ejecución. Casi siempres se usará require_once
// Es como el import de Java: trae código de otro archivo. Se puede usar para separar la lógica en varios archivos.
//      * usa include para archivos con contenido (plantillas html): 
//          header.php, footer.php, banner.php, ... 
//      * usa require para archivos con archivos obligatorios para que funcione (definiciones): 
//          clases, funciones, utilidades, constantes, configuraciones, ...
// Usa require_once mejor que require   SI SE CARGAN 2 VECES, DA ERROR (redefiniciones)
// Usa include mejor que include_once   EL CONTENIDO SÍ PODRÍA NECESITAR CARGARSE 2 VECES 
//      (una sección que se imprime varias veces, por ejemplo un banner al principio y final de la página)
// Ver ejemplo includeVsRequire.php
// ############################################################################


// ############################################################################
echo "\n===== 3. ARRAYS  (CE 3.3) =====\n";
// ############################################################################
// [JAVA] Un array de PHP es un MAPA ORDENADO (como LinkedHashMap) que hace de lista, diccionario, pila y cola.
// [JAVA] En PHP se COPIA al asignarlo (semántica de valor, copia lógica o copia on write (COW)), no se comparte la referencia.

echo "\n--- 3.1 Crear ---\n";
$frutas  = ['manzana', 'pera', 'uva'];                // indexada: claves 0, 1, 2
$frutas2 = array('manzana', 'pera', 'uva');          // sintaxis antigua
echo "\$frutas (print_r) = \n";  print_r($frutas);
echo "\$frutas (var_dump) = \n";  var_dump($frutas);
$persona = ['nombre' => 'Ana', 'edad' => 30];         // asociativa
echo "\$persona = \n";  print_r($persona);
$mixto   = [10 => 'a', 'b', 'x' => 'c', 'd'];         // tras la clave 10, la siguiente automática es 11
echo "\$mixto = \n";  print_r($mixto);
$k = [];
$k['1'] = 'a';  $k[true] = 'b';  $k[null] = 'c';  $k['01'] = 'd';
echo "\$k = \n";  print_r($k);
// conversiones de clave: string numérico (si no empieza por 0)=> int | bool => 0/1 | null => "" | float => int (trunca) | array/objeto => error


echo "range(1, 5) = \n";  print_r(range(1, 5));
echo "range('a', 'e') = \n";  print_r(range('a', 'e'));
echo 'range(0, 10, 2) = ';  print_r(range(0, 10, 2)); 

$original = [1, 2, 3];
$copia    = $original;               // copia por valor. Hasta que no se modifica, comparten la misma memoria (copy-on-write)
$copia[]  = 4;
echo "copia por valor: \$original = \n";
print_r($original);
echo "copia por valor: \$copia = \n";
print_r($copia);


echo "\n--- 3.2 Acceder, modificar, borrar ---\n";
echo '$frutas[1] = ', $frutas[1], ' | $persona["nombre"] = ', $persona['nombre'], "\n";
echo '$persona["altura"] ?? "n/d" = ', $persona['altura'] ?? 'n/d', "  (clave inexistente => Warning; usar ?? o isset)\n";
$conNulo = ['a' => null];
echo 'isset($conNulo["a"]) (false si vale null) => ';               var_dump(isset($conNulo['a']));
echo 'array_key_exists("a", $conNulo) (existe la clave) => ';        var_dump(array_key_exists('a', $conNulo));
$frutas[]  = 'kiwi';                 // añadir al final
$frutas[1] = 'pomelo';               // modificar
echo "tras añadir y modificar(\$frutas) = \n"; print_r($frutas);
unset($frutas[0]);                   // borrar: NO reindexa
echo "tras unset(\$frutas[0]) = \n"; print_r($frutas);
echo 'array_values() "reindexa" = '; print_r(array_values($frutas));  // devuelve un array NUEVO con los valores, no modifica el original
echo 'array_keys($frutas) = '; print_r(array_keys($frutas));    // devuelve un array NUEVO con las claves

$alumnos = [                         // array multidimensional (lo que en Java sería List<Map<...>>)
    ['nombre' => 'Ana',  'nota' => 8.5],
    ['nombre' => 'Luis', 'nota' => 4.0],
    ['nombre' => 'Eva',  'nota' => 9.0],
];
echo '$alumnos[2]["nombre"] = ', $alumnos[2]['nombre'], "\n";

echo "\n--- 3.3 Recorrer ---\n";
foreach ($alumnos as $i => $al) {
    echo "  #$i {$al['nombre']}: {$al['nota']}\n";    // con claves entre comillas, hay que usar llaves { }
};
foreach ($alumnos as $alumno) {
    foreach ($alumno as $clave => $valor) {
        echo "$clave = $valor \t";
    };
    echo "\n";
};

echo "Recorrer por valor ";
$dobles = [1, 2, 3];
foreach ($dobles as $d) {           // por valor: no modifica los elementos
    $d *= 2;
    echo "$d ";
}
print_r($dobles);
echo "Recorrer por referencia ";
foreach ($dobles as &$d) {           // por referencia (&): permite MODIFICAR los elementos
    $d *= 2;
    echo "$d ";
}
unset($d);                           // OBLIGATORIO: si no, $d sigue apuntando al último elemento y corrompe el siguiente foreach
print_r($dobles);
// Sin &, $d es una copia: cambiarla no cambia el array.

echo "\n--- 3.4 Funciones de array más usadas ---\n";
$n = [5, 3, 9, 1];
echo 'count = ', count($n);
echo "\narray_sum = ", array_sum($n);
echo "\nmax = ", max($n);
echo "\nmin = ", min($n), "\n";
echo 'in_array(9, $n) => '; var_dump(in_array(9, $n));
echo 'in_array("9", $n, true) (3er parámetro true = compara con ===) => ';   var_dump(in_array('9', $n, true));
echo 'array_search(9, $n) = ', array_search(9, $n), "  (devuelve la CLAVE o false: compara SIEMPRE con ===)\n";

echo "\npush/pop/unshift/shift:";
$pila = [1, 2];
array_push($pila, 3);                // igual que $pila[] = 3 (esta forma es algo más rápida: no llama a función)
echo "\n","array_push: "; print_r($pila);
$ultimo = array_pop($pila);
echo "array_pop: "; print_r($pila);
array_unshift($pila, 0);             // añade al PRINCIPIO (reindexa)
echo "array_unshift: "; print_r($pila);
$primero = array_shift($pila);       // quita del PRINCIPIO (reindexa)
echo "array_shift: ";  print_r($pila);
echo "\$ultimo (pop) = $ultimo | \$primero (shift) = $primero\n";

// [JAVA] En PHP sort() y compañía MODIFICAN el array recibido (van por referencia) y devuelven true, no el array ordenado.
$s = [5, 3, 9, 1];
sort($s);   echo "\nsort  (ascendente, reindexa): ", implode(',', $s), "\n";
rsort($s);  echo 'rsort (descendente):          ', implode(',', $s), "\n";
$notas = ['Ana' => 8, 'Luis' => 4, 'Eva' => 9];
asort($notas);   echo 'asort  (por valor, conserva claves): ', json_encode($notas), "\n";
arsort($notas);  echo 'arsort (por valor, descendente):     ', json_encode($notas), "\n";
ksort($notas);   echo 'ksort  (por clave):                  ', json_encode($notas), "\n";
krsort($notas);  echo 'krsort (por clave, descendente):     ', json_encode($notas), "\n";

/*          ESTUDIAR DESPUÉS DE VER FUNCIONES (sección 4) 
usort($alumnos, fn($a, $b) => $b['nota'] <=> $a['nota']);     // ordenación personalizada con <=>
echo 'usort por nota descendente: ', implode(', ', array_column($alumnos, 'nombre')), "\n";
echo "\narray_map (*2)            = ", implode(',', array_map(fn($v) => $v * 2, [1, 2, 3])), "\n";
echo 'array_filter (pares)      = ', json_encode(array_filter([1, 2, 3, 4], fn($v) => $v % 2 === 0)), "  <- ¡conserva las claves!\n";
echo 'array_values(array_filter) = ', json_encode(array_values(array_filter([1, 2, 3, 4], fn($v) => $v % 2 === 0))), "\n";
echo 'array_reduce (suma)       = ', array_reduce([1, 2, 3, 4], fn($acc, $v) => $acc + $v, 0), "\n"; 
*/

//echo 'array_column(alumnos, "nota", "nombre") = ', json_encode(array_column($alumnos, 'nota', 'nombre')), "\n";    // Transforma una matriz de registros (matriz multidimensional) en un array asociativo más simple.
echo "\n",'array_merge([1,2],[2,3])    = ', json_encode(array_merge([1, 2], [2,3]));
echo "\n",'array_merge(["a"=>1],["b"=>2], ["b"=>3]) = ', json_encode(array_merge(['a' => 1], ['b' => 2], ['b' => 3])), " gana el 2º array en caso de clave repetida\n";
echo '[1,2] + [9,8,7] (unión por claves: gana el 1er array en caso de clave repetida) = ', json_encode([1, 2] + [9, 8, 7]);  // el operador + une arrays por CLAVE. El operador merge une arrays por POSICION (no por valor). Unir por valor quitando repetidos lo hace array_unique(array_merge(...)). 
$a = ['nombre' => 'Ana','edad' => 20];
$b = ['edad' => 99,'ciudad' => 'Madrid'];
echo "\na+b = ", json_encode($a + $b), "\n";

echo "\n",'spread [...[1,2], ...[3]] = ', json_encode([...[1, 2], ...[3]]), " equivale a array_merge(\$a, \$b), pero más moderno.\n";
echo 'array_slice([10,20,30,40], 1, 2) = ', json_encode(array_slice([10, 20, 30, 40], 1, 2));
echo "\n",'array_reverse([1,2,3]) = ', json_encode(array_reverse([1, 2, 3])), "\n";
echo 'array_unique([3,1,3,2,1]) = ', json_encode(array_unique([3, 1, 3, 2, 1]));
echo "\n",'array_keys  = ', json_encode(array_keys($notas));
echo "\n",'array_values = ', json_encode(array_values($notas));
echo "\n",'array_flip(["a"=>1,"b"=>2]) = ', json_encode(array_flip(['a' => 1, 'b' => 2])), "\n";
echo 'explode(",", "a,b,c") = ', json_encode(explode(',', 'a,b,c'));
echo "\n",'implode("-", [1,2,3]) = ', implode('-', [1, 2, 3]);
echo "\n",'array_combine(["a","b"], [1,2]) = ', json_encode(array_combine(['a', 'b'], [1, 2])), "\n";
echo 'array_key_first($notas) = ', array_key_first($notas), "\n";
echo 'array_key_last($notas) = ', array_key_last($notas), "\n";

[$a1, $b1] = [1, 2];                                       // desestructuración (equivale a list($a1, $b1), pero más moderno)
['nombre' => $nom, 'edad' => $ed] = $persona;              // por claves
echo "\ndesestructuración: a1=$a1 b1=$b1 | nom=$nom ed=$ed\n";


// ############################################################################
echo "\n===== 4. FUNCIONES  (CE 3.4) =====\n";
// ############################################################################
// [JAVA] En PHP las funciones son independientes: no hace falta clase ni "static". No hay sobrecarga (un nombre = una función).
// Los nombres de función NO distinguen mayúsculas de minúsculas (ELEVADA() == elevada()), las variables SÍ.

echo ELEVADA(), "\n";                 // se llama ANTES de definirla: hoisting (solo con funciones de nivel superior, no dentro de if/otra función)
function elevada(): string
{
    return 'función llamada antes de su definición (hoisting)';
}

function suma(int $a, int $b = 10): int     // tipos de parámetros y de retorno: opcionales pero recomendables (mantenibilidad, legibilidad, autocompletado IDE, depuración). $b tiene valor por defecto.
{
    return $a + $b;
}
echo 'suma(2, 3) = ', suma(2, 3), ' | suma(2) (valor por defecto) = ', suma(2), "\n";
echo 'Argumentos con nombre (8.0): suma(b: 1, a: 5) = ', suma(b: 1, a: 5), "\n";    // permite cambiar el orden de los argumentos y saltarse los opcionales
echo 'Modo débil convierte tipos: suma("5", 3) = ', suma('5', 3), "\n";
try {
    suma('abc', 1);
} catch (TypeError $e) {
    echo 'suma("abc", 1) => TypeError: ', strstr($e->getMessage(), ', called', true), "\n";
}
// declare(strict_types=1) (PRIMERA instrucción del archivo) desactiva la conversión de "5" a 5 en las llamadas.
// Tipos útiles: int float string bool array callable mixed void ?int (nullable) int|string (unión).

function dividir(float $a, float $b): ?float          // ?float => devuelve float o null.  
{
    return $b === 0.0 ? null : $a / $b;
}
echo 'dividir(10, 4) = ', dividir(10, 4), ' | dividir(1, 0) => ';
var_dump(dividir(1, 0));

function media(float ...$numeros): float              // variádica: recoge todos los argumentos en un array. Número indeterminado de argumentos.
{
    return count($numeros) > 0 ? array_sum($numeros) / count($numeros) : 0.0;
}
echo 'media(4, 8, 6) = ', media(4, 8, 6), ' | media(...[1, 2, 3, 4]) (spread al llamar) = ', media(...[1, 2, 3, 4]), "\n";

function incrementar(int &$n): void                   // & => por REFERENCIA: modifica la variable original. Desaconsejado por mantenibilidad: mejor devolver explícitamente el resultado con return.
{
    $n++;
}
$contadorRef = 1;
incrementar($contadorRef);
echo 'por referencia: $contadorRef tras incrementar() = ', $contadorRef, "\n";

function anadirAlFinal(array $a): array               // por valor: trabaja con una copia (copy-on-write)
{
    $a[] = 99;
    return $a;
}
$orig  = [1, 2];
$nuevo = anadirAlFinal($orig);
echo "\npor valor: original ", json_encode($orig), ' | devuelto ', json_encode($nuevo), "\n";
// [JAVA] En Java todo se pasa por valor (incluso los objetos y arrays, aunque el resultado puede no parecerlo); en PHP tú eliges con &. Cuando dudes, pasa por valor y devuelve el resultado con return.

function minMax(array $v): array                      // "devolver varios valores" = devolver un array
{
    return [min($v), max($v)];
}
[$mn, $mx] = minMax([4, 9, 1]);
echo "minMax([4,9,1]) => min=$mn max=$mx\n\n";

// Ámbito (scope): las variables globales NO se ven dentro de las funciones.
$global = 'soy global';
function sinAcceso()  { return isset($global) ? 've $global' : 'NO ve $global (ámbito local)'; }
function conGlobal()  { global $global; return "con global: $global"; }
function conGlobals() { return 'con $GLOBALS: ' . $GLOBALS['global']; }
echo sinAcceso(), ' | ', conGlobal(), ' | ', conGlobals(), "\n";
// Mejor práctica: pasar los datos por parámetro y devolver con return. Las constantes SÍ se ven en cualquier sitio.

function contador(): int
{
    static $veces = 0;                // static: la variable local CONSERVA su valor entre llamadas
    return ++$veces;
}
contador();
contador();
echo 'static: tercera llamada a contador() = ', contador(), "\n";

function factorial(int $n): int                       // recursividad: la función se llama a sí misma
{
    return $n <= 1 ? 1 : $n * factorial($n - 1);
}
echo 'factorial(5) = ', factorial(5), "\n\n";