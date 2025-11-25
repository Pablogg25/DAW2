const $analizadorDOM = () => {
  const normalizarTexto = (el) => {
    return el.textContent.trim().replace(/\s+/g, " ");
  };
  const extraerData = (el) => {
    const datos = {};
    for (let key in el.dataset) {
      datos[key] = el.dataset[key];
    }
    return datos;
  };
};
