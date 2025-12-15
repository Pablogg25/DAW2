// Promesas.js
import { Validaciones } from "./Validaciones.js";
import { ValidacionError } from "./ValidacionError.js";

const nombreInput = document.getElementById("nombre");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const fechaInput = document.getElementById("fecha");
const guardarInput = document.getElementById("guardar");

// ------------------ UTILIDADES ------------------

function marcarError(error) {
  alert(error.message);
  const campo = document.getElementById(error.campo);
  campo.classList.remove("bien");
  campo.classList.add("error");
}

function limpiarCampo(input) {
  input.classList.remove("error");
  input.classList.remove("bien");
}

// ------------------ VALIDACIONES CON PROMESAS ------------------

function validarNombreP(input) {
  limpiarCampo(input);
  return new Promise((resolve, reject) => {
    try {
      const valor = Validaciones.validarNombre(input);
      input.classList.add("bien");
      resolve(valor);
    } catch (e) {
      reject(new ValidacionError(e.message, "nombre"));
    }
  });
}

function validarPasswordP(input) {
  limpiarCampo(input);
  return new Promise((resolve, reject) => {
    try {
      const valor = Validaciones.validarPassword(input);
      input.classList.add("bien");
      resolve(valor);
    } catch (e) {
      reject(new ValidacionError(e.message, "password"));
    }
  });
}

function validarEmailP(input) {
  limpiarCampo(input);
  return new Promise((resolve, reject) => {
    try {
      const valor = Validaciones.validarEmail(input);
      input.classList.add("bien");
      resolve(valor);
    } catch (e) {
      reject(new ValidacionError(e.message, "email"));
    }
  });
}

function validarFechaP(input) {
  limpiarCampo(input);
  return new Promise((resolve, reject) => {
    try {
      const valor = Validaciones.validarFechaNacimiento(input);
      input.classList.add("bien");
      resolve(valor);
    } catch (e) {
      reject(new ValidacionError(e.message, "fecha"));
    }
  });
}

// ------------------ FLUJO SECUENCIAL CON PROMESAS ------------------

guardarInput.addEventListener("click", () => {
  const datos = {};

  validarNombreP(nombreInput)
    .then((v1) => {
      datos.nombre = v1;
      return validarPasswordP(passwordInput);
    })
    .then((v2) => {
      datos.password = v2;
      return validarEmailP(emailInput);
    })
    .then((v3) => {
      datos.email = v3;
      return validarFechaP(fechaInput);
    })
    .then((v4) => {
      datos.fecha = v4;

      alert("Formulario validado correctamente (PROMESAS)");

      localStorage.setItem("ud3e7_datos", JSON.stringify(datos));
    })
    .catch((error) => {
      marcarError(error);
    });
});

// ------------------ PRECARGA DESDE LOCALSTORAGE ------------------

window.addEventListener("DOMContentLoaded", () => {
  const guardado = localStorage.getItem("ud3e7_datos");
  if (guardado) {
    const datos = JSON.parse(guardado);
    nombreInput.value = datos.nombre || "";
    passwordInput.value = datos.password || "";
    emailInput.value = datos.email || "";
    fechaInput.value = datos.fecha || "";
  }
  console.log(guardado);
});
