<?php
/**
 * ============================================================================
 *  RESUMEN DE LA CHULETA "PHP 8.3 CHEAT SHEET" (para quien viene de Java)
 * ============================================================================
 *  Ejecutar:   php php_cheatsheet_demo_resumen.php
 *
 *  - Solo echo / print / var_dump: sin funciones ni clases propias.
 *  - var_dump() se usa cuando el resultado es bool, float o null, porque echo
 *    los muestra mal (false y null se imprimen vacíos).
 *  - Las marcas [JAVA] señalan diferencias importantes respecto a Java.
 *  - Se han omitido a propósito: arrays, objetos, archivos y elementos obsoletos.
 * ============================================================================
 */

header('Content-Type: text/plain; charset=utf-8');   // solo afecta si se ejecuta en un navegador
error_reporting(E_ALL);
ini_set('display_errors', '1');
date_default_timezone_set('Europe/Madrid');


// ############################################################################
echo "\n===== 1. HELLO WORLD =====\n";
// ############################################################################
// [JAVA] No hay clase ni main(): el script se ejecuta de arriba a abajo.

echo "Hola mundo\n";                                      // echo: construcción del lenguaje
print "Hola con print\n";                                 // print: igual, pero devuelve 1
echo 'Varios', ' ', 'argumentos', "\n";                   // echo admite varios argumentos
printf("%s tiene %d años y mide %.2f m\n", 'Ana', 30, 1.7);   // como System.out.printf


// ############################################################################
echo "\n===== 2. PHP TAGS =====\n";
// ############################################################################
// Un .php es texto/HTML con "islas" de código PHP entre etiquetas:
//  - Estándar:  "<" + "?php" ... "?" + ">"   (la recomendada)
//  - Eco corto: "<" + "?= expr" + cierre; equivale a echo expr;
//  - En archivos solo-PHP se OMITE la etiqueta de cierre (evita espacios que romperían header()).
//  - (Se escriben "partidas" porque un comentario // termina donde aparece la etiqueta de cierre.)

?>
   [Este texto está FUERA de las etiquetas PHP: se emite tal cual]
<?php
$titulo = 'Eco corto';
?>
   Usando eco corto: <?= $titulo ?>

<?php


// ############################################################################
echo "\n===== 3. VARIABLES =====\n";
// ############################################################################
// [JAVA] Toda variable empieza por $, no se declara su tipo (lo lleva el VALOR) y se crea al asignar.

$entero  = 42;
$texto   = 'Hola';
$activo  = true;
$nada    = null;
echo "\$entero = $entero | \$texto = $texto\n";          // las comillas dobles interpolan variables
echo '$activo = ';  var_dump($activo);
echo '$nada = ';    var_dump($nada);

$cambiante = 10;
echo 'gettype(10) = ', gettype($cambiante), "\n";
$cambiante = 'ahora soy texto';                          // el tipo cambia con el valor
echo 'gettype("...") = ', gettype($cambiante), "\n";

$x = 1;
$y = &$x;                                                // $y es un alias de $x (referencia)
$y++;
echo 'referencia: $x tras $y++ = ', $x, "\n";

echo 'isset($nada) => ';         var_dump(isset($nada));         // false si no existe o es null
echo 'empty("0") / empty(0.0)  => ';           var_dump(empty('0'), empty(0.0));
echo 'empty(0) / empty("a") => ';   var_dump(empty(0.0), empty('a'));
           // true para 0, "", "0", null, false, sin asignar, ...
unset($cambiante);                                               // elimina la variable
echo 'isset($cambiante) tras unset => ';   var_dump(isset($cambiante));
echo '$noExiste ?? "por defecto" = ', $noExiste ?? 'por defecto', "\n";
// [JAVA] Leer una variable no definida da un Warning, no un error de compilación.
// Ámbito: las variables globales NO se ven dentro de funciones (hace falta "global" o $GLOBALS).
// Superglobales siempre accesibles: $_GET $_POST $_SERVER $_SESSION $_COOKIE...


// ############################################################################
echo "\n===== 4. CONSTANTS =====\n";
// ############################################################################
// Sin $, globales, inmutables y sensibles a mayúsculas. [JAVA] Sustituyen a "static final".

define('SALUDO', 'Hola');           // en ejecución (el nombre puede calcularse)
const DESPEDIDA = 'Adiós';          // en compilación (solo en el nivel superior)
echo 'SALUDO = ', SALUDO, ' | DESPEDIDA = ', DESPEDIDA, "\n";
echo 'PHP_VERSION = ', PHP_VERSION, "\n";
echo 'PHP_INT_MAX = ', PHP_INT_MAX, "\n";
echo '__LINE__ (constante mágica) = ', __LINE__, "\n";
// Otras mágicas: __FILE__, __DIR__, __FUNCTION__, __CLASS__, __METHOD__, __NAMESPACE__.


// ############################################################################
echo "\n===== 5. STRINGS =====\n";
// ############################################################################
// [JAVA] Son secuencias de BYTES (no UTF-16) y se manipulan con funciones (strlen($s)), no con métodos.

$nombre = 'Mundo';
echo 'Simples (literal):   Hola $nombre\n', "\n";
echo "Dobles (interpolan): Hola $nombre | tab[\t] | unicode \u{00F1}\n";

$s = 'Hola';
echo '$s[0] = ', $s[0], ' | $s[-1] (índice negativo) = ', $s[-1], "\n";
echo '"Hola" . " " . "PHP" (concatenar con punto) = ', 'Hola' . ' ' . 'PHP', "\n";
echo '"abc" === "abc" => ';   var_dump('abc' === 'abc');       // [JAVA] no hace falta .equals()
echo '"10" == "1e1" (¡se comparan como números!) => ';   var_dump('10' == '1e1');


// ############################################################################
echo "\n===== 6. INTEGERS =====\n";
// ############################################################################
// int de 64 bits. [JAVA] Solo existe "int" (equivale a long). Al desbordarse pasa a float.

echo 'Decimal 255 | hex 0xFF | binario 0b1010 | octal 0o10 | separador 1_000_000 => '
   , 255, ' | ', 0xFF, ' | ', 0b1010, ' | ', 0o10, ' | ', 1_000_000 , "\n";
echo 'PHP_INT_MAX + 1 (pasa a float) => ';   var_dump(PHP_INT_MAX + 1);
echo '7 / 2 (¡división real! en Java daría 3) => ';   var_dump(7 / 2);
echo 'intdiv(7, 2) = ', intdiv(7, 2), ' | 7 % 3 = ', 7 % 3, ' | 2 ** 10 = ', 2 ** 10, "\n";


// ############################################################################
echo "\n===== 7. FLOATS =====\n";
// ############################################################################
// Doble precisión IEEE 754, igual que double en Java.

echo 'Literales 1.5 | 1.2e3 => ';   var_dump(1.5, 1.2e3);
echo '0.1 + 0.2 => ';                                var_dump(0.1 + 0.2);
echo '0.1 + 0.2 == 0.3 => ';                         var_dump(0.1 + 0.2 == 0.3);
echo 'abs((0.1 + 0.2) - 0.3) < PHP_FLOAT_EPSILON (comparación correcta) => ';
var_dump(abs((0.1 + 0.2) - 0.3) < PHP_FLOAT_EPSILON);
echo 'fdiv(1, 0) (INF, sin excepción) => ';   var_dump(fdiv(1, 0));
// Dividir entre cero con "/" lanza DivisionByZeroError.


// ############################################################################
echo "\n===== 8. COMMENTS =====\n";
// ############################################################################
// Una línea con //
# Una línea con # (menos usado; "#[" abre un atributo, no un comentario)
/* Varias líneas
   (no se pueden anidar) */
/**
 * DocBlock: comentario de documentación leído por IDEs. [JAVA] Equivale a Javadoc.
 */
echo "Los comentarios no se imprimen.\n";     // también al final de línea


// ############################################################################
echo "\n===== 9. ATOMIC / BUILT-IN TYPES =====\n";
// ############################################################################
// Escalares: bool, int, float, string. Especial: null.
// [JAVA] Los tipos son OPCIONALES y pertenecen al VALOR. En las funciones se declaran
// (function f(int $a): int) y PHP convierte valores (modo débil) salvo con declare(strict_types=1).

echo 'get_debug_type(42) = ', get_debug_type(42), ' | get_debug_type(3.14) = ', get_debug_type(3.14), ' | get_debug_type("a") = ', get_debug_type('a'), "\n";
echo 'gettype(42) = ', gettype(42), " (nombre histórico: prefiere get_debug_type)\n";
echo 'is_int(5) / is_numeric("1e3") / is_numeric("abc") => ';   var_dump(is_int(5), is_numeric('1e3'), is_numeric('abc'));

echo '(int) "12abc" => ';   var_dump((int) '12abc');       // casting: trunca / lee el prefijo numérico
echo '(bool) "0" => ';      var_dump((bool) '0');

echo '"5" + 3 (conversión automática) => ';   var_dump('5' + 3);

echo 'Valores FALSOS: 0, "", "0", null, 0.0, false => ';
var_dump((bool) 0, (bool) '', (bool) '0', (bool) null, (bool) 0.0, (bool) false);
echo 'Valores VERDADEROS: "0.0", "false", -1 => ';
var_dump((bool) '0.0', (bool) 'false', (bool) -1);
// [JAVA] En Java solo un boolean puede ir en un if; en PHP cualquier valor se convierte a bool.

// declare(strict_types=1);  -> PRIMERA instrucción del archivo; activa el tipado estricto (para funciones y métodos).

// ############################################################################
echo "\n===== 12. ARITHMETIC OPERATORS =====\n";
// ############################################################################
$a = 17;
$b = 5;
echo '$a + $b = ', $a + $b, ' | $a - $b = ', $a - $b, ' | $a * $b = ', $a * $b, "\n";
echo '$a / $b => ';   var_dump($a / $b);
echo '10 / 5 (exacta entre enteros => int) => ';   var_dump(10 / 5);
echo '$a % $b = ', $a % $b, ' | -$a % $b (signo del dividendo) = ', -$a % $b, "\n";
echo '$a ** 2 (potencia) = ', $a ** 2, ' | 2 ** 3 ** 2 (asociativa por la derecha) = ', 2 ** 3 ** 2, "\n";
echo '-$a / +"5" (unarios) => ';   var_dump(-$a, +'5');
echo 'intdiv($a, $b) = ', intdiv($a, $b), ' | fmod(17.5, 5) = ', fmod(17.5, 5), "\n";
echo '2 + 3 * 4 = ', 2 + 3 * 4, ' | (2 + 3) * 4 = ', (2 + 3) * 4, ' | -2 ** 2 = ', -2 ** 2, "\n";
echo '"5" + "5" (los strings numéricos suman) => ';   var_dump('5' + '5');
// Con "/" o "%" entre cero lanza DivisionByZeroError; "abc" * 2 lanza TypeError (PHP 8).


// ############################################################################
echo "\n===== 13. BITWISE OPERATORS =====\n";
// ############################################################################
$bx = 0b1100;   // 12
$by = 0b1010;   // 10
echo '$bx & $by (AND)  = ', sprintf('%04b (%d)', $bx & $by, $bx & $by), "\n";
echo '$bx | $by (OR)   = ', sprintf('%04b (%d)', $bx | $by, $bx | $by), "\n";
echo '$bx ^ $by (XOR)  = ', sprintf('%04b (%d)', $bx ^ $by, $bx ^ $by), "\n";
echo '~$bx (NOT) = ', ~$bx, " NO ENTRA EN EXAMEN\n";   // no entra en examen
echo '$bx << 2 = ', $bx << 2, ' | $bx >> 2 = ', $bx >> 2, ' | -8 >> 1 (conserva el signo) = ', -8 >> 1, "\n";
echo '"a" ^ " " (¡también opera sobre strings, byte a byte!) = ', 'a' ^ ' ', "\n";
// [JAVA] No existe >>> (desplazamiento sin signo).
const PERM_LEER = 1 << 0;
const PERM_ESCRIBIR = 1 << 1;
$permisos = PERM_LEER | PERM_ESCRIBIR;                    // uso típico: banderas (flags)
echo '¿puede escribir? ($permisos & ESCRIBIR) !== 0 => ';   var_dump(($permisos & PERM_ESCRIBIR) !== 0);
$permisos &= ~PERM_LEER;                                  // quitar una bandera
echo 'tras quitar LEER: ', $permisos, "\n";


// ############################################################################
echo "\n===== 14. ASSIGNMENT OPERATORS =====\n";
// ############################################################################
$n = 10;
$n += 5;   echo '$n += 5   -> ', $n, "\n";
$n -= 3;   echo '$n -= 3   -> ', $n, "\n";
$n *= 2;   echo '$n *= 2   -> ', $n, "\n";
$n /= 4;   echo '$n /= 4   -> ', $n, "\n";
$n = 17;
$n %= 5;   echo '$n = 17; $n %= 5  -> ', $n, "\n";
$n **= 3;  echo '$n **= 3  -> ', $n, "\n";
$str = 'Hola';
$str .= ' mundo';   echo '$str .= " mundo" -> ', $str, "\n";
$bits = 0b1111;
$bits &= 0b0101;    echo '$bits &= 0b0101 -> ', $bits, "\n";
$bits |= 0b1000;    echo '$bits |= 0b1000 -> ', $bits, "\n";
$bits ^= 0b0001;    echo '$bits ^= 0b0001 -> ', $bits, "\n";
$bits <<= 2;        echo '$bits <<= 2 -> ', $bits, "\n";
$bits >>= 1;        echo '$bits >>= 1 -> ', $bits, "\n";
$conf = null;
$conf ??= 'valor por defecto';       // asigna SOLO si es null o no existe (7.4)
echo '$conf ??= ... -> ', $conf, "\n";
$conf ??= 'otro';
echo '$conf ??= ... -> ', $conf, "\n";
$m = $o = 5;                         // asignación encadenada: la asignación es una expresión
echo '$m = $o = 5 -> ', $m, ', ', $o, "\n";
$original = 1;
$alias = &$original;                 // asignación por referencia
$alias = 99;
echo 'referencia (=&): $original = ', $original, "\n";


// ############################################################################
echo "\n===== 15. COMPARISON OPERATORS =====\n";
// ############################################################################
// [JAVA] == compara valores tras convertir tipos; === compara valor Y tipo. Usa casi siempre ===.
echo '5 == "5" => ';    var_dump(5 == '5');
echo '5 === "5" => ';   var_dump(5 === '5');
echo '5 != "5" => ';    var_dump(5 != '5');
echo '5 <> "5" (igual que !=) => ';   var_dump(5 <> '5');
echo '5 !== "5" => ';   var_dump(5 !== '5');
echo '3 < 5 / 3 <= 3 / 5 > 3 / 3 >= 4 => ';   var_dump(3 < 5, 3 <= 3, 5 > 3, 3 >= 4);
echo '"abc" <=> "abd" (nave espacial: -1, 0 o 1) = ', 'abc' <=> 'abd', ' | 5 <=> 5 = ', 5 <=> 5, ' | 9 <=> 3 = ', 9 <=> 3, "\n";
echo '0 == "a" (PHP 8: false ; en PHP 7 era true) => ';   var_dump(0 == 'a'); // php7 convertía un string no numérico a 0. PHP8 lo considera no numérico y devuelve false directamente.
echo '"1" == "01" / "10" == "1e1" / 100 == "1e2" => ';   var_dump('1' == '01', '10' == '1e1', 100 == '1e2');
echo 'null == false / null == 0 / null === false => ';   var_dump(null == false, null == 0, null === false);
echo '"0" == false => ';   var_dump('0' == false);
echo '"10" < "9" (números) / "10" < "9a" (texto) => ';   var_dump('10' < '9', '10' < '9a');


// ############################################################################
echo "\n===== 16. INCREMENTING / DECREMENTING OPERATORS =====\n";
// ############################################################################
$i = 5;
echo '$i++ (post: devuelve 5 y luego incrementa) = ', $i++, "\n";
echo '$i = ', $i, "\n";
echo '++ $i (pre: incrementa y devuelve 7) = ', ++$i, "\n";
echo '$i-- (post) = ', $i--, "\n";
echo '--$i (pre) = ', --$i, "\n";
$letra = 'a';
$letra++;                      // [JAVA] ¡Se puede incrementar un string! (estilo Perl)
echo '"a"++ = ', $letra, "\n";
$z = 'z';
$z++;
echo '"z"++ (como las columnas de Excel) = ', $z, "\n";
$nulo = null;
$nulo++;
echo 'null++ (pasa a 1) => ';   var_dump($nulo);
$nulo2 = null;
$nulo2--;
echo 'null-- (¡se queda en null!) NO EN EXAMEN=> ';   var_dump($nulo2);


// ############################################################################
echo "\n===== 17. LOGICAL OPERATORS =====\n";
// ############################################################################
// [JAVA] && || ! como en Java; además existen and, or, xor con MENOR precedencia.
// El resultado de && y || es siempre bool.
echo 'true && false => ';    var_dump(true && false);
echo 'true || false => ';    var_dump(true || false);
echo '!true => ';            var_dump(!true);
echo 'true xor true => ';    var_dump(true xor true);
echo '"hola" || 0 (valores convertidos a bool) => ';   var_dump('hola' || 0);
echo '"hola" && 0 (valores convertidos a bool) => ';   var_dump('hola' && 0);
echo "Cortocircuito (el lado derecho no se evalúa):\n";
   // El cortocircuito sirve para ahorrar trabajo y evitar errores.
   // En una condición doble, pongo primero el lado que es más probable que falle, para que no se evalúe el otro.
   // o pongo primero el computacionalmente menos costoso, para que no se evalúe el otro.
   // o pongo primero el que no puede fallar, para evitar division por cero por ejemplo.
   // o para debug, añado un true para asegurar que entra en esa rama.
print(" sssssssss  SI SE IMPRIME (IZQUIERDA de &&)\n") && false;  //INVESTIGAR

false && print("   NO SE IMPRIME (derecha de &&)\n");
true || print("   NO SE IMPRIME (derecha de ||)\n");
true  && print("   SÍ se imprime (derecha de && con true a la izquierda)\n"); // también se imprimiría con false || print(...)
$conseguido = false or $aviso = 'or ejecuta la parte derecha porque la izquierda es false';
echo $aviso, "\n";

$r1 = true and false;          // se interpreta como ($r1 = true) and false
$r2 = (true and false);
$r3 = true && false;         // se interpreta como $r3 = (true && false)
echo '$r1 = true and false (and pesa MENOS que =) => ';   var_dump($r1);
echo '$r2 = (true and false) => ';                         var_dump($r2);
echo '$r3 = true && false (&& pesa MÁS que =) => ';         var_dump($r3);


// ############################################################################
echo "\n===== 18. STRING OPERATORS =====\n";
// ############################################################################
// [JAVA] Solo dos: "." (concatenar) y ".=" (concatenar y asignar). El "+" NUNCA concatena.
$saludo = 'Hola' . ' ' . 'mundo';
$saludo .= '!';
echo '"Hola" . " " . "mundo" . "!" (con .=) = ', $saludo, "\n";
echo '"5" + "5" (suma) = ', '5' + '5', ' | "5" . "5" (concatena) = ', '5' . '5', "\n";
echo '"Total: " . 5 + 3 (PHP 8: + pesa MÁS que .) = ', 'Total: ' . 5 + 3, "\n";
echo '"Total: " . (5 + 3) = ', 'Total: ' . (5 + 3), "\n";


// ############################################################################
echo "\n===== 19. OTHER OPERATORS =====\n";
// ############################################################################
$edad = 20;
echo 'Ternario  $edad >= 18 ? "adulto" : "menor" = ', $edad >= 18 ? 'adulto' : 'menor', "\n";
$vacio = '';
echo 'Elvis     $vacio ?: "por defecto" = ', $vacio ?: 'por defecto', "\n";
echo 'Fusión    $noDef1 ?? $noDef2 ?? "último" = ', $noDef1 ?? $noDef2 ?? 'último', "\n";  // OJO, comprueba si es null, no si es falsy
echo '0 ?: "x" (comprueba "truthy") => ';   var_dump(0 ?: 'x');
echo '0 ?? "x" (solo comprueba null) => ';  var_dump(0 ?? 'x');
echo 'Anidar ternarios exige paréntesis: (true ? "a" : (false ? "b" : "c")) = ', (false ? 'a' : (false ? 'b' : 'c')), "\n";
$objNulo = null;

echo '@ (suprime el aviso)  @$sinDefinir => ';   @var_dump($sinDefinir);
echo 'print devuelve => ';   var_dump(print '');
// Backtick: `ls` ejecuta un comando de shell (equivale a shell_exec). Riesgo de seguridad.
// [JAVA] El "." de Java se divide en PHP: "->" para instancias y "::" para estáticos/constantes.
// Spread ...: expande listas de argumentos (requiere arrays, omitido aquí).
// Precedencia (mayor -> menor): ** ; ++ -- ~ @ ; instanceof ; ! ; * / % ; + - ; << >> ; . ;
//   < <= > >= ; == != === !== <> <=> ; & ; ^ ; | ; && ; || ; ?? ; ?: ; = += ... ; and ; xor ; or


// ############################################################################
echo "\n===== 20. STRING FUNCTIONS =====\n";
// ############################################################################
// [JAVA] Son funciones globales (strlen($s)), no métodos. Ojo al orden de parámetros: strpos($pajar, $aguja).
echo 'strlen("hola") = ', strlen('hola'), "\n";
echo 'strpos("hola mundo", "o") = ', strpos('hola mundo', 'o'), "\n";
echo 'strpos("abc", "z") (false si no está: compara con ===) => ';   var_dump(strpos('abc', 'z'));
echo 'str_contains / str_starts_with / str_ends_with (8.0) => ';
var_dump(str_contains('hola', 'ol'), str_starts_with('hola', 'ho'), str_ends_with('hola', 'la'));
echo 'substr("abcdef", 1, 3) = ', substr('abcdef', 1, 3), ' | substr("abcdef", -2) = ', substr('abcdef', -2), "\n";
echo 'str_replace("a", "4", "banana") = ', str_replace('a', '4', 'banana'), "\n";
echo 'strtoupper("hola") = ', strtoupper('hola'), ' | strtolower("HOLA") = ', strtolower('HOLA'), "\n";
echo 'ucfirst("hola") = ', ucfirst('hola'), ' | ucwords("hola mundo") = ', ucwords('hola mundo'), "\n";
echo 'trim("  hola  ") = [', trim('  hola  '), "]\n";
echo 'str_pad("7", 3, "0", STR_PAD_LEFT) = ', str_pad('7', 3, '0', STR_PAD_LEFT), "\n";
echo 'str_repeat("ab", 3) = ', str_repeat('ab', 3), "\n";
echo 'strcmp("a", "b") = ', strcmp('a', 'b'), "\n";
echo 'sprintf("%05.1f | %-6s| %+d | %x", 3.14159, "ab", 5, 255) = ', sprintf('%05.1f | %-6s| %+d | %x', 3.14159, 'ab', 5, 255), "\n";
echo 'htmlspecialchars("<b>T&C</b>") = ', htmlspecialchars('<b>T&C</b>'), "   (SIEMPRE al imprimir datos de usuario en HTML)\n";
echo 'preg_match("/^\d{4}-\d{2}$/", "2024-03") => ';   var_dump(preg_match('/^\d{4}-\d{2}$/', '2024-03'));
echo 'preg_replace("/\s+/", " ", "a   b    c") = ', preg_replace('/\s+/', ' ', 'a   b    c'), "\n";
echo 'base64_encode("hola") = ', base64_encode('hola'), "\n";
echo 'hash("sha256", "a") = ', hash('sha256', 'a'), "\n";
$hash = password_hash('secreto', PASSWORD_DEFAULT);       // incluye una sal aleatoria
echo 'password_verify("secreto", $hash) => ';   var_dump(password_verify('secreto', $hash));
echo 'json_validate("{\"a\":1}") (8.3) => ';    var_dump(json_validate('{"a":1}'));


// ############################################################################
echo "\n===== 21. MATH FUNCTIONS =====\n";
// ############################################################################
// [JAVA] Funciones globales: abs(), no Math.abs(). Constantes: M_PI, M_E...
echo 'abs(-5) = ', abs(-5), ' | sqrt(16) = ', sqrt(16), ' | pi() = ', pi(), "\n";
echo 'ceil(4.1) / floor(4.9) (devuelven float) => ';   var_dump(ceil(4.1), floor(4.9));
echo 'round(3.14159, 2) = ', round(3.14159, 2), ' | round(2.5) = ', round(2.5), ' | round(-2.5) = ', round(-2.5), "\n";
echo 'intdiv(17, 5) = ', intdiv(17, 5), ' | fdiv(1, 0) => ';   var_dump(fdiv(1, 0));
echo 'max(3, 9, 5) = ', max(3, 9, 5), ' | min(3, 9, 5) = ', min(3, 9, 5), "\n";
echo 'random_int(1, 6) (seguro; recomendado frente a rand/mt_rand) = ', random_int(1, 6), "\n";
echo 'number_format(1234567.891, 2, ",", ".") = ', number_format(1234567.891, 2, ',', '.'), "\n";


// ############################################################################
echo "\n===== 22. DATE/TIME FUNCTIONS =====\n";
// ############################################################################
// Zona horaria de la demo: Europe/Madrid (fijada al inicio).
// [JAVA] Estas funciones trabajan con "timestamps" Unix (segundos desde 1970-01-01 UTC).
echo 'date_default_timezone_get() = ', date_default_timezone_get(), "\n";
echo 'time() = ', time(), "\n";
echo 'hrtime(true) (nanosegundos; para medir tiempos) = ', hrtime(true), "\n";
$ts = mktime(14, 30, 0, 3, 15, 2024);         // hora, minuto, segundo, mes, día, año
echo 'mktime(14,30,0, 3,15,2024) = ', $ts, "\n";
echo 'date("Y-m-d H:i:s", $ts) = ', date('Y-m-d H:i:s', $ts), "\n";
echo 'date("D, d M Y", $ts) = ', date('D, d M Y', $ts), "\n";
echo 'date("c", $ts) (ISO 8601) = ', date('c', $ts), ' | gmdate("H:i", $ts) (UTC) = ', gmdate('H:i', $ts), "\n";
echo 'strtotime("2024-03-15 +1 week") -> ', date('Y-m-d', strtotime('2024-03-15 +1 week')), "\n";
echo 'checkdate(2, 30, 2024) / checkdate(2, 29, 2024) => ';   var_dump(checkdate(2, 30, 2024), checkdate(2, 29, 2024));
// Códigos de date(): Y año, m mes, d día, H hora (24h), i minutos, s segundos, D/l día, M/F mes.


// ############################################################################
echo "\n===== 23. PHP.INI DIRECTIVES =====\n";
// ############################################################################
// php.ini configura el intérprete (algo como las opciones -X de la JVM). Se lee con ini_get() y se
// cambia en ejecución con ini_set() (devuelve el valor anterior, o false si no se puede cambiar).
// Modos: USER (ini_set o .user.ini), PERDIR (php.ini/.htaccess), SYSTEM (solo php.ini), ALL (todos).
echo 'memory_limit (memoria máxima por script) => ';        var_dump(ini_get('memory_limit'));
echo 'max_execution_time (segundos; 0 = sin límite en CLI) => ';   var_dump(ini_get('max_execution_time'));
echo 'display_errors (mostrar errores en la salida) => ';   var_dump(ini_get('display_errors'));
echo 'error_reporting (nivel de errores) => ';              var_dump(ini_get('error_reporting'));
echo 'date.timezone (zona horaria por defecto) => ';        var_dump(ini_get('date.timezone'));
echo 'default_charset => ';                                 var_dump(ini_get('default_charset'));
echo 'precision (dígitos al imprimir floats con echo) => '; var_dump(ini_get('precision'));

$antes = ini_set('precision', '5');                         // cambio en tiempo de ejecución
echo 'ini_set("precision", "5") -> echo M_PI = ', M_PI, "\n";
ini_restore('precision');                                   // vuelve al valor de php.ini
echo 'ini_restore -> echo M_PI = ', M_PI, ' (valor anterior devuelto por ini_set: ', $antes, ")\n";
// PRODUCCIÓN: display_errors=Off, log_errors=On, expose_php=Off. Consola: "php --ini" y "php -i".


// ############################################################################
// exit() detiene el script; con un string lo imprime antes de salir.
exit("\nFin de la demostración.\n");
