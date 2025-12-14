import { Validaciones } from "./Validaciones.js";
import { ValidacionError } from "./ValidacionError.js";

const nombreInput = document.getElementById("nombre");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const fechaInput = document.getElementById("fecha");
const guardarInput = document.getElementById("guardar");

function marcarError(error) {
  alert(error);
}

function limpiarError(input) {
  input.classList.remove("error");
}

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
  const valor2 = passwordInput.value;

  let may = false,
    min = false,
    num = false;

  for (let c of valor2) {
    if (c >= "A" && c <= "Z") may = true;
    if (c >= "a" && c <= "z") min = true;
    if (!isNaN(c)) num = true;
  }

  if (!(may && min && num && valor2.length >= 8)) {
    return callback(
      null,
      new ValidacionError(
        "Debe tener mayúscula, minúscula, número y al menos 8 caracteres"
      )
    );
  }
  callback(valor2, null);
}

function validarEmail(valor, callback) {
  const valor3 = emailInput.value;
  const partes = valor.split("@");
  if (partes.length != 2) {
    return callback(
      null,
      new ValidacionError("El email debe contener una unica @")
    );
  }

  if (partes[0].length === 0 || partes[1].length === 0) {
    return callback(
      null,
      new ValidacionError("Debe haber texto antes y despues del @")
    );
  }
  const dominio = partes[1].split(".");
  if (dominio.length !== 2) {
    return callback(
      null,
      new ValidacionError("El email tiene que acabar en .xx o .xxx")
    );
  }
  if (dominio[1].length < 2 || dominio[1].length > 3) {
    return callback(
      null,
      new ValidacionError("La extension debe ser de 2 o 3 letras")
    );
  }
  return callback(valor3, null);
}

function validarFechaNacimiento(valor, callback) {
  const valor4 = fechaInput.value;
  const fecha = new Date(valor4);
  const hoy = new Date();

  let edad = hoy.getFullYear() - fecha.getFullYear();

  const cumpleEsteAño = new Date(
    hoy.getFullYear(),
    fecha.getMonth(),
    fecha.getDay()
  );

  if (hoy < cumpleEsteAño) edad--;

  if (edad < 18 || edad > 24) {
    return callback(
      null,
      new ValidacionError("La edad debe de estar entre 18 y 24 años")
    );
  }
  return callback(valor4, null);
}

guardarInput.addEventListener("click", () => {
  const nombre = nombreInput.value.trim();
  const contraseña = passwordInput.value.trim();
  const email = emailInput.value.trim();
  const fecha = fechaInput.value;
  validarNombre(nombre, (nombre, error) => {
    if (error) {
      marcarError(error);
      nombreInput.classList.remove("bien");
      nombreInput.classList.add("error");
    } else {
      nombreInput.classList.remove("error");
      nombreInput.classList.add("bien");
    }
    validarContraseña(contraseña, (contraseña, error) => {
      if (error) {
        marcarError(error);
        passwordInput.classList.remove("bien");
        passwordInput.classList.add("error");
      } else {
        passwordInput.classList.remove("error");
        passwordInput.classList.add("bien");
      }
      validarEmail(email, (email, error) => {
        if (error) {
          marcarError(error);
          emailInput.classList.remove("bien");
          emailInput.classList.add("error");
        } else {
          emailInput.classList.remove("error");
          emailInput.classList.add("bien");
        }
        validarFechaNacimiento(fecha, (fecha, error) => {
          if (error) {
            marcarError(error);
            fechaInput.classList.remove("bien");
            fechaInput.classList.add("error");
          } else {
            fechaInput.classList.remove("error");
            fechaInput.classList.add("bien");
          }
        });
      });
    });
  });
});
