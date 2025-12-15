export class ValidacionError extends Error {
  constructor(mensaje, campo) {
    super(mensaje);
    this.campo = campo;
    this.name = this.constructor.name;
  }
}
