//FORMATO 1
const $personaLiteral = {
  nombre: "Ana",
  nacimiento: new Date(2006, 3, 25),
  hobbies: ["leer", "bailar", "cine"],

  get edad() {
    let hoy = new Date();
    return hoy.getFullYear() - this.nacimiento.getFullYear();
  },
  saludar() {
    return `Hola, me llamo ${this.nombre} y me gusta ${this.hobbies}`;
  },
};
console.log("OBJETO LITERAL");
console.log($personaLiteral.edad);
console.log($personaLiteral.saludar());

//FORMATO 2
