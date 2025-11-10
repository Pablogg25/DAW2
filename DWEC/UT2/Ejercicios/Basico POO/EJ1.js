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
    return `Hola, me llamo ${this.nombre} y me gusta ${this.hobbies.join(" ")}`;
  },
};
console.log("OBJETO LITERAL");
console.log($personaLiteral.edad);
console.log($personaLiteral.saludar());

//FORMATO 2
function Persona1(nombre, nacimiento, hobbies) {
  this.nombre = nombre;
  this.nacimiento = nacimiento;
  this.hobbies = hobbies;
}

Persona1.prototype.getEdad = function () {
  let hoy = new Date();
  return hoy.getFullYear() - this.nacimiento.getFullYear();
};

Persona1.prototype.saludar = function () {
  return `Hola, me llamo ${this.nombre} y me gusta ${this.hobbies.join(" ")}`;
};
const p1 = new Persona1("Luis", new Date(1998, 2, 20), ["fútbol", "viajar"]);

console.log("\nFUNCIÓN CONSTRUCTORA");
console.log(p1.getEdad());
console.log(p1.saludar());

//FORMATO 3

class Persona2 {
  constructor(nombre, nacimiento, hobbies) {
    this.nombre = nombre;
    this.nacimiento = nacimiento;
    this.hobbies = hobbies;
  }

  get edad() {
    let hoy = new Date();
    return hoy.getFullYear() - this.nacimiento.getFullYear();
  }
  saludar() {
    return `Hola, me llamo ${this.nombre} y me gusta ${this.hobbies.join(" ")}`;
  }
}

const p2 = new Persona2("María", new Date(1995, 10, 1), ["pintar", "música"]);

console.log("\nCLASE ES6");
console.log(p2.edad);
console.log(p2.saludar());
