const $depurador = (() => {
  let inspector;
  let panel;
  let style;

  /**
   * Inyectamos el <style> para resaltados y los estilos basicos del panel
   */
  function crearEstilo() {
    style = document.createElement(style);
    style.textContent = `.resaltado {
  outline: 2px solid rgba(255, 0, 0, 0.8);
  background-color: rgba(255, 0, 0, 0.2);
}
.depurador {
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: #eee;
  border: 1px solid #999;
  padding: 8px;
  font: 12px sans-serif;
}
.depurador button {
  display: block;
  width: 100%;
  margin: 2px 0;
}
.depurador pre {
  background: #fff;
  padding: 4px;
  border: 1px solid #ccc;
}`;
    document.head.appendChild(style);
  }

  /**
   * Funcion que crea el panel de pepuracion
   */
  function crearPanel() {
    panel = document.createElement("div");
    panel.className = "depurador";
    const botones = [
      ["Raiz", () => inspector.irRaiz()],
      ["Padre", () => inspector.irPadre()],
      ["PrimerHijo", () => inspector.irPrimerHijo()],
      ["UltimoHijo", () => inspector.irUltimoHijo()],
      ["AnteriorHermano", () => inspector.irAnteriorHermano()],
      ["SiguienteHermano", () => inspector.irSiguienteHermnano()],
    ];

    botones.forEach(([txt, fn]) => {
      const b = document.createElement("button");
      b.textContent = txt;
      b.onclick = () => {
        fn();
        refrescar();
      };
      panel.appendChild(b);
    });
    const info = document.createElement("pre");
    panel.appendChild(info);

    function refrescar() {
      const i = inspector.obtenerInfo();
      info.textContent = `Etiqueta: ${i.etiqueta}\nId: ${i.id}\nClases: ${i.clases}\nTexto: ${i.texto}`;
    }
    panel._refrescar = refrescar;
    document.body.appendChild(panel);
  }

  return {
    /**
     * Añade la depuracion a la pagina
     */
    activarDepuracion() {
      if (panel) return;
      crearEstilo();
      inspector = new NodoInspector(document.body);
      crearPanel();
      panel._refrescar();
    },

    /**
     * Elimina la depuracion de la pagina
     */
    desactivarDepuracion() {
      if (!panel) return;
      panel.remove();
      style.remove();
      const actual = document.classList(".reslatado");
      if (actual) actual.classList.remove("reslatado");
      panel = null;
      style = null;
      inspector = null;
    },
  };
})();
