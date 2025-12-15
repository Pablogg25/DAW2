// Promesas.js
import { Validaciones } from "./Validaciones.js";
import { ValidacionError } from "./ValidacionError.js";

const nombreInput = document.getElementById("nombre");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const fechaInput = document.getElementById("fecha");
const guardarInput = document.getElementById("guardar");

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

function validarNombreP(valor) {
  limpiarCampo(nombreInput);
  return new Promise((resolve, reject) => {
    try {
      const v = Validaciones.validarNombre(valor);
      nombreInput.classList.add("bien");
      resolve(v);
    } catch (e) {
      reject(new ValidacionError(e.message, "nombre"));
    }
  });
}

function validarPasswordP(valor) {
  limpiarCampo(passwordInput);
  return new Promise((resolve, reject) => {
    try {
      const v = Validaciones.validarPassword(valor);
      passwordInput.classList.add("bien");
      resolve(v);
    } catch (e) {
      reject(new ValidacionError(e.message, "password"));
    }
  });
}

function validarEmailP(valor) {
  limpiarCampo(emailInput);
  return new Promise((resolve, reject) => {
    try {
      const v = Validaciones.validarEmail(valor);
      emailInput.classList.add("bien");
      resolve(v);
    } catch (e) {
      reject(new ValidacionError(e.message, "email"));
    }
  });
}

function validarFechaP(valor) {
  limpiarCampo(fechaInput);
  return new Promise((resolve, reject) => {
    try {
      const v = Validaciones.validarFechaNacimiento(valor);
      fechaInput.classList.add("bien");
      resolve(v);
    } catch (e) {
      reject(new ValidacionError(e.message, "fecha"));
    }
  });
}

// ------------------ FLUJO SECUENCIAL CON PROMESAS ------------------

guardarInput.addEventListener("click", () => {
  const nombre = nombreInput.value.trim();
  const contraseña = passwordInput.value.trim();
  const email = emailInput.value.trim();
  const fecha = fechaInput.value;

  let datos = {};
  console.log("nombreInput:", nombreInput);
  console.log("passwordInput:", passwordInput);
  console.log("emailInput:", emailInput);
  console.log("fechaInput:", fechaInput);

  console.log("nombre:", nombreInput?.value);
  console.log("password:", passwordInput?.value);
  console.log("email:", emailInput?.value);
  console.log("fecha:", fechaInput?.value);

  validarNombreP(nombre)
    .then((v1) => {
      datos.nombre = v1;
      return validarPasswordP(contraseña);
    })
    .then((v2) => {
      datos.password = v2;
      return validarEmailP(email);
    })
    .then((v3) => {
      datos.email = v3;
      return validarFechaP(fecha);
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
});
