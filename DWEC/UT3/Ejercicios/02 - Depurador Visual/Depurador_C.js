/*const $depurador = (() => {
  let inspector = null;
  let panel = null;
  let estiloResaltado = null;

  // Inyecta <style> para .resaltado y estilos del panel
  function crearEstilo() {
    const style = document.createElement("style");
    style.textContent = `
      .resaltado {
        outline: 2px dashed rgba(238, 99, 82, 0.9);
        background-color: rgba(238, 99, 82, 0.2);
        transition: background-color 120ms ease-out, outline-color 120ms ease-out;
      }
      .depurador-panel {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 2147483647;
        max-width: 360px;
        background: #fff;
        border: 1px solid #dcdcdc;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        border-radius: 10px;
        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        color: #222;
        overflow: hidden;
      }
      .depurador-header {
        padding: 10px 12px;
        background: #f6f6f6;
        border-bottom: 1px solid #e9e9e9;
        font-weight: 600;
      }
      .depurador-controls {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        padding: 10px 12px;
      }
      .depurador-controls button,
      .depurador-footer button {
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid #ccc;
        background: #fff;
        cursor: pointer;
      }
      .depurador-controls button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .depurador-info {
        padding: 10px 12px 12px;
      }
      .depurador-info pre {
        margin: 0;
        padding: 8px 10px;
        background: #fbfbfb;
        border: 1px solid #eee;
        border-radius: 8px;
        white-space: pre-wrap;
        word-break: break-word;
        font-size: 12px;
        line-height: 1.4;
      }
      .depurador-footer {
        display: flex;
        gap: 8px;
        padding: 10px 12px 12px;
        border-top: 1px solid #e9e9e9;
      }
    `;
    document.head.appendChild(style);
    return style;
  }

  // Construye el panel (sin IDs)
  function crearPanel() {
    const container = document.createElement("div");
    container.className = "depurador-panel";
    container.dataset.depurador = "panel";

    const header = document.createElement("div");
    header.className = "depurador-header";
    header.textContent = "Depurador DOM";

    const controls = document.createElement("div");
    controls.className = "depurador-controls";

    const btnRaiz = document.createElement("button");
    btnRaiz.textContent = "Raíz";
    const btnPadre = document.createElement("button");
    btnPadre.textContent = "Padre";
    const btnPrimerHijo = document.createElement("button");
    btnPrimerHijo.textContent = "Primer hijo";
    const btnUltimoHijo = document.createElement("button");
    btnUltimoHijo.textContent = "Último hijo";
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "Hermano anterior";
    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "Hermano siguiente";

    controls.appendChild(btnRaiz);
    controls.appendChild(btnPadre);
    controls.appendChild(btnPrimerHijo);
    controls.appendChild(btnUltimoHijo);
    controls.appendChild(btnAnterior);
    controls.appendChild(btnSiguiente);

    const infoBox = document.createElement("div");
    infoBox.className = "depurador-info";
    const pre = document.createElement("pre");
    infoBox.appendChild(pre);

    const footer = document.createElement("div");
    footer.className = "depurador-footer";
    const btnBody = document.createElement("button");
    btnBody.textContent = "Seleccionar <body>";
    const btnOff = document.createElement("button");
    btnOff.textContent = "Desactivar";
    footer.appendChild(btnBody);
    footer.appendChild(btnOff);

    container.appendChild(header);
    container.appendChild(controls);
    container.appendChild(infoBox);
    container.appendChild(footer);

    // Navegación
    btnRaiz.addEventListener("click", () => {
      inspector.irRaiz();
      refrescar();
    });
    btnPadre.addEventListener("click", () => {
      inspector.irPadre();
      refrescar();
    });
    btnPrimerHijo.addEventListener("click", () => {
      inspector.irPrimerHijo();
      refrescar();
    });
    btnUltimoHijo.addEventListener("click", () => {
      inspector.irUltimoHijo();
      refrescar();
    });
    btnAnterior.addEventListener("click", () => {
      inspector.irAnteriorHermano();
      refrescar();
    });
    btnSiguiente.addEventListener("click", () => {
      inspector.irSiguienteHermano();
      refrescar();
    });

    btnBody.addEventListener("click", () => {
      const body = document.body;
      if (body) inspector = new NodoInspector(body);
      refrescar();
    });

    btnOff.addEventListener("click", () => api.deshactivarDepuracion());

    // Refrescar UI
    function refrescar() {
      const info = inspector.obtenerInfo();
      pre.textContent =
        `Etiqueta: ${info.etiqueta}\n` +
        `Id: ${info.id}\n` +
        `Clases: ${info.clases}\n` +
        `Texto: ${info.texto}`;

      // Estado de botones
      btnRaiz.disabled = inspector.esRaiz;
      btnPadre.disabled = inspector.esRaiz;
      btnPrimerHijo.disabled = !inspector.tieneHijos;
      btnUltimoHijo.disabled = !inspector.tieneHijos;

      // Hermanos (excluyendo el panel)
      const actual = document.querySelector(".resaltado");
      const prev = actual ? actual.previousElementSibling : null;
      const next = actual ? actual.nextElementSibling : null;

      const prevOk =
        prev && (!prev.dataset || prev.dataset.depurador !== "panel");
      const nextOk =
        next && (!next.dataset || next.dataset.depurador !== "panel");
      btnAnterior.disabled = !prevOk;
      btnSiguiente.disabled = !nextOk;
    }

    container._refrescar = refrescar;
    document.body.appendChild(container);
    return container;
  }

  const api = {
    activarDepuracion() {
      if (panel) return; // ya activo
      estiloResaltado = crearEstilo();
      inspector = new NodoInspector(document.body);
      panel = crearPanel();
      panel._refrescar();
    },
    deshactivarDepuracion() {
      if (!panel) return;
      const actual = document.querySelector(".resaltado");
      if (actual) actual.classList.remove("resaltado");
      panel.remove();
      panel = null;
      if (estiloResaltado) {
        estiloResaltado.remove();
        estiloResaltado = null;
      }
      inspector = null;
    },
  };

  return api;
})();
*/
