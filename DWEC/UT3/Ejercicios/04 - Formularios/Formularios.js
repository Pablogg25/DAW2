const form = document.getElementById("registroForm");
const resultado = document.getElementById("resultado");
const btnSumbit = document.getElementById("btnSumbit");

/**
 * Expresionres regulares
 */
const genericoNumero = /\d/;

/**
 * Gestion de Errores
 */
function mostrarError(campo, mensaje) {
  const span = campo.parentElement.querySelector(".error");
  span.textContent = mensaje;
  campo.classList.add("invalid");
  campo.classList.remove("valid");
}

function limpiarError(campo, mensaje) {
  const span = campo.parentElement.querySelector(".error");
  span.textContent = mensaje;
  campo.classList.add("valid");
  campo.classList.remove("invalid");
}
/**
 * Validaciones
 */
function validarNombre(campo) {
  const valor = campo.value.trim();
  if (valor.length < 3) return mostrarError(campo, "Minimo 3 caracteres");
  if (valor.match(genericoNumero))
    return mostrarError(campo, "No puede tener numeros");
  limpiarError(campo);
  return true;
}
/**
 * Envios
 */
function enviar() {}
