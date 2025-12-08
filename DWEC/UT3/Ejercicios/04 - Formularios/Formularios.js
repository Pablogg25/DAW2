const form = document.getElementById("registroForm");
const resultado = document.getElementById("resultado");
const btnSubmit = document.getElementById("btnSubmit");

function mostrarError(campo, mensaje) {
  const span = campo.parentElement.querySelector(".error");
  span.textContent = mensaje;
  campo.classList.add("invalid");
  campo.classList.remove("valid");
  return false;
}

function limpiarError(campo) {
  const span = campo.parentElement.querySelector(".error");
  span.textContent = "";
  campo.classList.add("valid");
  campo.classList.remove("invalid");
  return true;
}

// Validaciones
function validarNombre(campo) {
  const valor = campo.value.trim();
  if (valor.length < 3) return mostrarError(campo, "Mínimo 3 caracteres");
  if (/\d/.test(valor)) return mostrarError(campo, "No debe contener números");
  return limpiarError(campo);
}

function validarEmail(campo) {
  const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!regex.test(campo.value.trim()))
    return mostrarError(campo, "Formato inválido");
  return limpiarError(campo);
}

function validarPassword(campo) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!regex.test(campo.value))
    return mostrarError(
      campo,
      "Debe tener 8 caracteres, mayúscula, número y especial"
    );
  return limpiarError(campo);
}

function validarConfirmPassword(campo, passCampo) {
  if (campo.value !== passCampo.value)
    return mostrarError(campo, "No coincide con la contraseña");
  return limpiarError(campo);
}

function validarFecha(campo) {
  if (!campo.value) return mostrarError(campo, "Campo obligatorio");
  const fecha = new Date(campo.value);
  const hoy = new Date();
  let edad = hoy.getFullYear() - fecha.getFullYear();
  const cumpleEsteAño = new Date(
    hoy.getFullYear(),
    fecha.getMonth(),
    fecha.getDate()
  );
  if (hoy < cumpleEsteAño) edad--;
  if (edad < 16) return mostrarError(campo, "Debes tener al menos 16 años");
  return limpiarError(campo);
}

function validarTelefono(campo) {
  const valor = campo.value.trim();
  if (valor === "") return limpiarError(campo); // opcional
  if (!/^\d{9}$/.test(valor))
    return mostrarError(campo, "Debe tener 9 dígitos");
  return limpiarError(campo);
}

function validarGenero(campo) {
  if (campo.value === "") return mostrarError(campo, "Selecciona un género");
  return limpiarError(campo);
}

function validarTerminos(campo) {
  if (!campo.checked) return mostrarError(campo, "Debes aceptar los términos");
  return limpiarError(campo);
}

// Validación dinámica
form.querySelectorAll("input, select").forEach((campo) => {
  const evento =
    campo.type === "checkbox" || campo.tagName === "SELECT"
      ? "change"
      : "input";
  campo.addEventListener(evento, () => validarCampo(campo));
});

function validarCampo(campo) {
  switch (campo.id) {
    case "nombre":
      return validarNombre(campo);
    case "email":
      return validarEmail(campo);
    case "password":
      return validarPassword(campo);
    case "confirmPassword":
      return validarConfirmPassword(campo, document.getElementById("password"));
    case "fechaNacimiento":
      return validarFecha(campo);
    case "telefono":
      return validarTelefono(campo);
    case "genero":
      return validarGenero(campo);
    case "terminos":
      return validarTerminos(campo);
  }
}

// Validación al enviar
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valido = true;
  form.querySelectorAll("input, select").forEach((campo) => {
    if (!validarCampo(campo)) valido = false;
  });

  if (!valido) {
    resultado.textContent = "Hay errores en el formulario.";
    btnSubmit.disabled = true;
  } else {
    btnSubmit.disabled = false;
    const datos = {};
    new FormData(form).forEach((valor, clave) => (datos[clave] = valor));
    resultado.textContent =
      "Registro correcto:\n" + JSON.stringify(datos, null, 2);
  }
});
