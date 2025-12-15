export class Validaciones {
  static validarNombre(input) {
    const valor = input.value.trim();

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

    let may = false,
      min = false,
      num = false;

    for (let c of valor) {
      if (c >= "A" && c <= "Z") may = true;
      if (c >= "a" && c <= "z") min = true;
      if (!isNaN(c)) num = true;
    }

    if (!(may && min && num && valor.length >= 8)) {
      throw new Error(
        "Debe tener mayúscula, minúscula, número y al menos 8 caracteres"
      );
    }

    return valor;
  }

  static validarEmail(input) {
    const valor = input.value.trim();

    if (valor.length === 0) {
      throw new Error("El email no puede estar vacío");
    }

    const partes = valor.split("@");
    if (partes.length !== 2) {
      throw new Error("El email debe contener una única @");
    }

    if (partes[0].length === 0 || partes[1].length === 0) {
      throw new Error("Debe haber texto antes y después de la @");
    }

    const dominio = partes[1].split(".");
    if (dominio.length !== 2) {
      throw new Error("El email debe terminar en .xx o .xxx");
    }

    if (dominio[1].length < 2 || dominio[1].length > 3) {
      throw new Error("La extensión debe tener 2 o 3 letras");
    }

    return valor;
  }

  static validarFechaNacimiento(input) {
    const valor = input.value;

    const fecha = new Date(valor);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fecha.getFullYear();

    const cumpleEsteAño = new Date(
      hoy.getFullYear(),
      fecha.getMonth(),
      fecha.getDate()
    );

    if (hoy < cumpleEsteAño) edad--;

    if (edad < 18 || edad > 24) {
      throw new Error("La edad debe de estar entre 18 y 24 años");
    }

    return valor;
  }
}
