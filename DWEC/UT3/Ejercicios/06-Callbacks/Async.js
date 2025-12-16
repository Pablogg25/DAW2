// Async.js
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

// ------------------ VALIDACIONES ENVUELTAS EN PROMESAS ------------------

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

// ------------------ FLUJO SECUENCIAL CON ASYNC/AWAIT ------------------

guardarInput.addEventListener("click", async () => {
  const datos = {};

  try {
    datos.nombre = await validarNombreP(nombreInput);
    datos.password = await validarPasswordP(passwordInput);
    datos.email = await validarEmailP(emailInput);
    datos.fecha = await validarFechaP(fechaInput);

    alert("Formulario validado correctamente (ASYNC/AWAIT)");

    localStorage.setItem("ud3e7_datos", JSON.stringify(datos));
  } catch (error) {
    marcarError(error);
  }
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
});
