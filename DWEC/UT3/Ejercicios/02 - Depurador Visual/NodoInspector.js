class NodoInspector {
  #nodoActual;

  constructor(nodoInicial) {
    const inicio =
      nodoInicial && nodoInicial.nodeType === Node.ELEMENT_NODE
        ? nodoInicial
        : document.body;
    this.#nodoActual = null;
    this.#actualizarNodo(inicio);
  }

  get esRaiz() {
    return this.#nodoActual === document.documentElement;
  }

  get esPrimerHijo() {
    const p = this.#nodoActual.parentElement;
    if (!p) return true;
    return this.#primerHijoValido(p) === this.#nodoActual;
  }

  get esUltimoHijo() {
    const p = this.#nodoActual.parentElement;
    if (!p) return true;
    return this.#ultimoHijoValido(p) === this.#nodoActual;
  }

  get tieneHijos() {
    return Boolean(this.#primerHijoValido(this.#nodoActual));
  }

  obtenerInfo() {
    const el = this.#nodoActual;
    return {
      etiqueta: el.tagName.toLowerCase(),
      id: el.id || "noid",
      clases: el.classList.length
        ? Array.from(el.classList).join(" ")
        : "noclass",
      texto: el.textContent.trim(),
    };
  }

  irRaiz() {
    this.#actualizarNodo(document.documentElement);
  }
  irPadre() {
    const padre = this.#elementoValido(this.#nodoActual.parentElement)
      ? this.#nodoActual.parentElement
      : null;
    if (padre) this.#actualizarNodo(padre);
  }
  irPrimerHijo() {
    const hijo = this.#primerHijoValido(this.#nodoActual);
    if (hijo) this.#actualizarNodo(hijo);
  }
  irUltimoHijo() {
    const hijo = this.#ultimoHijoValido(this.#nodoActual);
    if (hijo) this.#actualizarNodo(hijo);
  }
  irAnteriorHermano() {
    let prev = this.#nodoActual.previousElementSibling;
    while (prev && !this.#elementoValido(prev))
      prev = prev.previousElementSibling;
    if (prev) this.#actualizarNodo(prev);
  }
  irSiguienteHermano() {
    let next = this.#nodoActual.nextElementSibling;
    while (next && !this.#elementoValido(next)) next = next.nextElementSibling;
    if (next) this.#actualizarNodo(next);
  }

  #actualizarNodo(nuevo) {
    if (this.#nodoActual) this.#nodoActual.classList.remove("resaltado");
    if (nuevo) {
      this.#nodoActual = nuevo;
      this.#nodoActual.classList.add("resaltado");
    }
  }

  #elementoValido(el) {
    return (
      el &&
      el.nodeType === Node.ELEMENT_NODE &&
      el.dataset?.depurador !== "panel"
    );
  }

  #primerHijoValido(el) {
    let c = el.firstElementChild;
    while (c && !this.#elementoValido(c)) c = c.nextElementSibling;
    return c || null;
  }

  #ultimoHijoValido(el) {
    let c = el.lastElementChild;
    while (c && !this.#elementoValido(c)) c = c.previousElementSibling;
    return c || null;
  }
}
