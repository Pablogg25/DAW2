class NodoInspector {
  #nodoActual;
  constructor(nodoInicial) {
    // Si no viene nodo, empezamos por document.body
    const inicio =
      nodoInicial && nodoInicial.nodeType === Node.ELEMENT_NODE
        ? nodoInicial
        : document.body;
    this.#nodoActual = null;
    // this.#actualizarNodo(inicio);
  }

  get esRaiz() {
    const html = document.documentElement;
    return this.#nodoActual === html;
  }

  get esPrimerHijo() {
    const padre = this.#nodoActual.parentElement;
    if (!padre) return true;
    return padre.firstElementChild === this.#nodoActual;
  }
}
