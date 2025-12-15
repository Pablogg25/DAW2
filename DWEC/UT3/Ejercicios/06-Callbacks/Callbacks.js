import { Validaciones } from "./Validaciones.js";
import { ValidacionError } from "./ValidacionError.js";

const nombreInput = document.getElementById("nombre");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const fechaInput = document.getElementById("fecha");
const guardarInput = document.getElementById("guardar");

function marcarError(error) {
  alert(error.message);
}

function limpiarError(input) {
  input.classList.remove("error");
  input.classList.remove("bien");
}

// --- VALIDACIONES CON CALLBACK (valor, callback(valorOK, error)) ---

function validarNombre(valor, callback) {
  if (valor.length < 3) {
    return callback(
      null,
      new ValidacionError(
        "El nombre debe tener al menos 3 caracteres",
        "nombre"
      )
    );
  }
  for (let c of valor) {
    if (c >= "0" && c <= "9") {
      return callback(
        null,
        new ValidacionError("El nombre no puede contener números", "nombre")
      );
    }
  }
  callback(valor, null);
}

function validarContraseña(valor, callback) {
  let may = false,
    min = false,
    num = false;

  for (let c of valor) {
    if (c >= "A" && c <= "Z") may = true;
    if (c >= "a" && c <= "z") min = true;
    if (!isNaN(c)) num = true;
  }

  if (!(may && min && num && valor.length >= 8)) {
    return callback(
      null,
      new ValidacionError(
        "Debe tener mayúscula, minúscula, número y al menos 8 caracteres",
        "password"
      )
    );
  }
  callback(valor, null);
}

function validarEmail(valor, callback) {
  const partes = valor.split("@");
  if (partes.length != 2) {
    return callback(
      null,
      new ValidacionError("El email debe contener una única @", "email")
    );
  }

  if (partes[0].length === 0 || partes[1].length === 0) {
    return callback(
      null,
      new ValidacionError("Debe haber texto antes y después de la @", "email")
    );
  }
  const dominio = partes[1].split(".");
  if (dominio.length !== 2) {
    return callback(
      null,
      new ValidacionError("El email tiene que acabar en .xx o .xxx", "email")
    );
  }
  if (dominio[1].length < 2 || dominio[1].length > 3) {
    return callback(
      null,
      new ValidacionError("La extensión debe ser de 2 o 3 letras", "email")
    );
  }
  return callback(valor, null);
}

function validarFechaNacimiento(valor, callback) {
  const fecha = new Date(valor);
  const hoy = new Date();

  let edad = hoy.getFullYear() - fecha.getFullYear();

  const cumpleEsteAño = new Date(
    hoy.getFullYear(),
    fecha.getMonth(),
    fecha.getDate() // aquí va getDate, no getDay
  );

  if (hoy < cumpleEsteAño) edad--;

  if (edad < 18 || edad > 24) {
    return callback(
      null,
      new ValidacionError("La edad debe de estar entre 18 y 24 años", "fecha")
    );
  }
  return callback(valor, null);
}

// --- FLUJO PROGRESIVO  ---

guardarInput.addEventListener("click", () => {
  const nombre = nombreInput.value.trim();
  const contraseña = passwordInput.value.trim();
  const email = emailInput.value.trim();
  const fecha = fechaInput.value;

  limpiarError(nombreInput);
  limpiarError(passwordInput);
  limpiarError(emailInput);
  limpiarError(fechaInput);

  validarNombre(nombre, (nombreOK, error1) => {
    if (error1) {
      marcarError(error1);
      nombreInput.classList.add("error");
      return;
    }
    nombreInput.classList.add("bien");

    validarContraseña(contraseña, (passOK, error2) => {
      if (error2) {
        marcarError(error2);
        passwordInput.classList.add("error");
        return;
      }
      passwordInput.classList.add("bien");

      validarEmail(email, (emailOK, error3) => {
        if (error3) {
          marcarError(error3);
          emailInput.classList.add("error");
          return;
        }
        emailInput.classList.add("bien");

        validarFechaNacimiento(fecha, (fechaOK, error4) => {
          if (error4) {
            marcarError(error4);
            fechaInput.classList.add("error");
            return;
          }
          fechaInput.classList.add("bien");

          // Si hemos llegado aquí, todo ha ido bien
          alert("Formulario validado correctamente");

          localStorage.setItem(
            "ud3e7_datos",
            JSON.stringify({
              nombre: nombreOK,
              password: passOK,
              email: emailOK,
              fecha: fechaOK,
            })
          );
        });
      });
    });
  });
});
console.log(localStorage["ud3e7_datos"]);
