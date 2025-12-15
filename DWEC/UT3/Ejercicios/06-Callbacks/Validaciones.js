export class Validaciones {
  static validarNombre(input) {
    const valor = input.value.trim();
    input.setCustomValidity("");

    if (valor.length < 3) {
      throw new Error("El nombre debe tener al menos 3 caracteres");
    }

    for (let letra of valor) {
      if (!isNaN(letra)) {
        throw new Error("El nombre no puede contener números");
      }
    }

    return valor;
  }

  static validarPassword(input) {
    const valor = input.value;
    input.setCustomValidity("");

    let may = false,
      min = false,
      num = false;

    for (let c of valor) {
      if (c >= "A" && c <= "Z") may = true;
      if (c >= "a" && c <= "z") min = true;
      if (!isNaN(c)) num = true;
    }

    if (!(may && min && num && valor.length >= 8)) {
      input.setCustomValidity(
        "Debe tener mayúscula, minúscula, número y al menos 8 caracteres"
      );
      return false;
    }

    return true;
  }

  static validarEmail(input) {
    if (!valor) {
      throw new Error("El email no puede estar vacío");
    }

    const v = valor.trim();
    const valor = input.value.trim();
    input.setCustomValidity("");
    const partes = valor.split("@");
    if (partes.length != 2) {
      input.setCustomValidity("El email debe contener una unica @");
      return false;
    }

    if (partes[0].length === 0 || partes[1].length === 0) {
      input.setCustomValidity("Debe haber texto antes y despues del @");
      return false;
    }
    const dominio = partes[1].split(".");
    if (dominio.length !== 2) {
      input.setCustomValidity("El email tiene que acabar en .xx o .xxx");
      return false;
    }
    if (dominio[1].length < 2 || dominio[1].length > 3) {
      input.setCustomValidity("La extension debe ser de 2 o 3 letras");
      return false;
    }
    return true;
  }

  static validarFechaNacimiento(input) {
    const valor = input.value;
    input.setCustomValidity("");
    const fecha = new Date(valor);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fecha.getFullYear();

    const cumpleEsteAño = new Date(
      hoy.getFullYear(),
      fecha.getMonth(),
      fecha.getDay()
    );

    if (hoy < cumpleEsteAño) edad--;

    if (edad < 18 || edad > 24) {
      input.setCustomValidity("La edad debe de estar entre 18 y 24 años");
      return false;
    }
    return true;
  }
}
