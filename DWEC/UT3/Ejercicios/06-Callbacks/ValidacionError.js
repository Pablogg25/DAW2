export class ValidacionError extends Error {
  constructor(mensaje, campo) {
    super(mensaje);
    this.campo = campo;
  }
}
