let cadena1 = "Pablo";
let cadena2 = "González García";
let numero1 = 19;
let numero2 = 2006;

/*1️⃣Muestra en un alert las variables introducidas con formato clave valor en donde los 
valores cadena aparezcan envueltos entre comillas dobles y los valores numéricos 
entre comillas simples.*/
alert(
  'Nombre = "' +
    cadena1 +
    '"\n' +
    'Apellidos = "' +
    cadena2 +
    '"\n' +
    'Edad = "' +
    numero1 +
    '"\n' +
    'Año de Nacimiento = "' +
    numero2 +
    '"'
);
// 3️⃣ Mostrar nombre y apellidos separados por un salto de línea
alert(nombre + "\n" + apellido);

// 4️⃣ Mostrar la suma de edad + añoNacimiento
alert("Suma de edad y año de nacimiento: " + (edad + anioNacimiento));

// 5️⃣ Mostrar la suma de todas las variables
alert(
  "Suma de todas las variables: " + (nombre + apellido + edad + anioNacimiento)
);
