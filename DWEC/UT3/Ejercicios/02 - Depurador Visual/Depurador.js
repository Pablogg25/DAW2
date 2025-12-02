const $depurador = (() => {
  let inspector;
  let panel;
  let styleEl;

  // Inyecta <style> para .resaltado y estilos básicos del panel
  function crearEstilo() {
    styleEl = document.createElement("style");
    styleEl.textContent = `
.resaltado {
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
  max-width: 260px;
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
  white-space: pre-wrap;
  word-break: break-word;
}
`;
    document.head.appendChild(styleEl);
  }

  function crearPanel() {
    panel = document.createElement("div");
    panel.className = "depurador";
    panel.dataset.depurador = "panel"; // excluye el panel de la navegación

    const info = document.createElement("pre");
    panel.appendChild(info);

    function refrescar() {
      const i = inspector.obtenerInfo();
      info.textContent = `Etiqueta: ${i.etiqueta}\nId: ${i.id}\nClases: ${i.clases}\nTexto: ${i.texto}`;
      // (Opcional)
      btnRaiz.disabled = inspector.esRaiz;
      btnPadre.disabled = inspector.esRaiz;
      btnPrimerHijo.disabled = !inspector.tieneHijos;
      btnUltimoHijo.disabled = !inspector.tieneHijos;
      const actual = document.querySelector(".resaltado");
      const prevOk = !!(actual && actual.previousElementSibling);
      const nextOk = !!(actual && actual.nextElementSibling);
      btnAnteriorHermano.disabled = !prevOk;
      btnSiguienteHermano.disabled = !nextOk;
    }

    // Botones uno a uno
    const btnRaiz = document.createElement("button");
    btnRaiz.textContent = "Raíz";
    btnRaiz.onclick = () => {
      inspector.irRaiz();
      refrescar();
    };
    panel.appendChild(btnRaiz);

    const btnPadre = document.createElement("button");
    btnPadre.textContent = "Padre";
    btnPadre.onclick = () => {
      inspector.irPadre();
      refrescar();
    };
    panel.appendChild(btnPadre);

    const btnPrimerHijo = document.createElement("button");
    btnPrimerHijo.textContent = "Primer hijo";
    btnPrimerHijo.onclick = () => {
      inspector.irPrimerHijo();
      refrescar();
    };
    panel.appendChild(btnPrimerHijo);

    const btnUltimoHijo = document.createElement("button");
    btnUltimoHijo.textContent = "Último hijo";
    btnUltimoHijo.onclick = () => {
      inspector.irUltimoHijo();
      refrescar();
    };
    panel.appendChild(btnUltimoHijo);

    const btnAnteriorHermano = document.createElement("button");
    btnAnteriorHermano.textContent = "Hermano anterior";
    btnAnteriorHermano.onclick = () => {
      inspector.irAnteriorHermano();
      refrescar();
    };
    panel.appendChild(btnAnteriorHermano);

    const btnSiguienteHermano = document.createElement("button");
    btnSiguienteHermano.textContent = "Hermano siguiente";
    btnSiguienteHermano.onclick = () => {
      inspector.irSiguienteHermano();
      refrescar();
    };
    panel.appendChild(btnSiguienteHermano);

    panel._refrescar = refrescar;
    document.body.appendChild(panel);
  }

  return {
    activarDepuracion() {
      if (panel) return;
      crearEstilo();
      inspector = new NodoInspector(document.body);
      crearPanel();
      panel._refrescar();
    },
    desactivarDepuracion() {
      if (!panel) return;
      panel.remove();
      if (styleEl) styleEl.remove();
      const actual = document.querySelector(".resaltado");
      if (actual) actual.classList.remove("resaltado");
      panel = null;
      styleEl = null;
      inspector = null;
    },
  };
})();
