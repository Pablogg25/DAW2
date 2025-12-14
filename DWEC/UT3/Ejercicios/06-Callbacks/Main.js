import { Validaciones } from "./Validaciones.js";

const nombre = document.getElementById("nombre");
const password = document.getElementById("password");
const email = document.getElementById("email");
const fecha = document.getElementById("fecha");
const guardar = document.getElementById("guardar");

nombre.addEventListener("blur", () => Validaciones.validarNombre(nombre));
password.addEventListener("blur", () => Validaciones.validarPassword(password));
// email.addEventListener("input", () => Validaciones.validarEmail(email));
// fecha.addEventListener("input", () =>
//   Validaciones.validarFechaNacimiento(fecha)
// );

guardar.addEventListener("click", () => {
  const okNombre = Validaciones.validarNombre(nombre);
  const okPass = Validaciones.validarPassword(password);
  const okEmail = Validaciones.validarEmail(email);
  const okFecha = Validaciones.validarFechaNacimiento(fecha);

  if (!okNombre) {
    nombre.reportValidity();
    return;
  }
  if (!okPass) {
    password.reportValidity();
    return;
  }
  if (!okEmail) {
    email.reportValidity();
    return;
  }
  if (!okFecha) {
    fecha.reportValidity();
    return;
  }

  alert("Formulario validado correctamente (versión base)");
});
