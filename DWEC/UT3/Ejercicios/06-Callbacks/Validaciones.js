export class Validaciones {
  static validarNombre(nombre) {
    nombre.setCustomValidity("");
    let exito = true;
    let valor = nombre.value;
    for (let letra of valor) {
      if (!isNaN(letra)) {
        exito = false;
      }
    }
    if (!exito) {
      // alert("Nombre");
      nombre.setCustomValidity("No puede contener números");
    } else {
      nombre.setCustomValidity("Todo Bien");
    }
    if (!nombre.checkValidity()) {
    }
  }

  static validarContraseña(contraseña) {
    contraseña.setCustomValidity("");
    let valor = contraseña.value;
    let exitoNumero = true;
    let exitoEdad = true;
    if (valor === valor.toLowerCase()) {
      contraseña.setCustomValidity("Debe contener al menos una mayuscula");
    }

    if (valor === valor.toUpperCase()) {
      contraseña.setCustomValidity("Debe tener al menos una minuscula");
    }
    for (let letra of valor) {
      if (!isNaN(letra)) {
        exitoNumero = false;
      }
      if (!exitoNumero) {
        contraseña.setCustomValidity("Debe contener al menos un número");
      }
    }
  }

  static validarEmail(email) {}

  static validarEdad(fecha) {}
}
