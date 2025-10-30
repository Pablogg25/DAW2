function sonAnagramas(pal1, pal2) {
  // 1. Si son exactamente iguales, no son anagramas
  if (pal1 === pal2) return false;

  // 2. Si no tienen la misma longitud, no pueden ser anagramas
  if (pal1.length !== pal2.length) return false;

  // 3. Array contador para 26 letras (a–z)
  let contador = [];
  for (let i = 0; i < 26; i++) {
    contador[i] = 0;
  }

  // 4. Contar letras de pal1
  for (let i = 0; i < pal1.length; i++) {
    let letra = pal1[i].toLowerCase();
    let pos = letra.charCodeAt(0) - 97; // 'a' = 97 ASCII
    contador[pos]++;
  }

  // 5. Restar letras de pal2
  for (let i = 0; i < pal2.length; i++) {
    let letra = pal2[i].toLowerCase();
    let pos = letra.charCodeAt(0) - 97;
    contador[pos]--;
  }

  // 6. Si todos los valores quedan 0 → anagramas
  for (let i = 0; i < 26; i++) {
    if (contador[i] !== 0) return false;
  }

  return true;
}

// --------- PRUEBAS ---------
console.log(sonAnagramas("roma", "amor")); // true
console.log(sonAnagramas("listen", "silent")); // true
console.log(sonAnagramas("hola", "halo")); // false
console.log(sonAnagramas("oso", "oso")); // false (son iguales)
