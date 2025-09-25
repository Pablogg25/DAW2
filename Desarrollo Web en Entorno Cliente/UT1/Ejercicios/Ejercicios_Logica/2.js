let min = 0, max = 0, suma = 0, media = 0, total = 0;
let numero = 0;

//se puede hacer con do while
numero = Number(prompt('Introduce un numero, si es 0 sale', 1));
max = numero;
min = numero;
while (numero !== 0) {
    suma = suma + numero;
    if (numero >= max) {
        max = numero;
    } if (numero <= min) {
        min = numero;
    }
    total++;
    numero = Number(prompt('Introduce un numero, si es 0 sale', 1));


}
if (total > 0) {
    media = suma / total;
    alert(`El minimo es ${min} el  maximo es ${max} la suma es ${suma} la media es ${media} el total de numeros introducidos es ${total} `);
}
else {
    alert('No se introdujeron numeros')
}