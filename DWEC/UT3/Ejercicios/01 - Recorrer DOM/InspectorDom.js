const InspectorDOM = (() => {
  /**
   * Recorre el dom a partir del elemento <body>
   * y devuelve un objeto JSON que represente la estructura
   **/
  function obtenerEstructuraJSON() {
    function recorrerElemento(elemento) {
      return {
        etiqueta: elemento.tagName.toLowerCase(),
        texto: elemento.textContent.trim(),
        tieneId: !!elemento.id,
        lstClass: Array.from(elemento.classList),
        lstData: { ...elemento.dataset },
        lstHijos: Array.from(elemento.children).map(recorrerElemento),
      };
    }
    recorrerElemento(document.body);
  }

  /**
   *Localiza el primer nodo indicado por el selector y
   *analiza los nodos que van desde la raiz del documento hasta dicho nodo,
   *en ese sentido mostrado: "etiqueta-identificador-clases-texto del contenido"
   */
  function imprimirEstructura(selector) {
    const nodo = document.querySelector(selector);
    if (!nodo) return `Selector sin resultados: ${selector}`;
    const camino = [];
    const actual = nodo;
    while (actual) {
      const etiqueta = actual.tagName.toLowerCase();
      const identificador = actual.id || "No hay id";
      const clases = actual.classList.length
        ? Array.from(actual.classList).join(" ")
        : "noclass";
      const texto = actual.textContent.trim();
      camino.unshift(`${etiqueta}-${identificador}-${clases}-${texto}`);
      actual = actual.parentElement;
    }
  }

  return {
    obtenerEstructuraJSON,
    imprimirEstructura,
  };
})();
