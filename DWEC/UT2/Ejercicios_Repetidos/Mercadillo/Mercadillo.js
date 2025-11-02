const $negocio = (function () {
  let inventario = [];
  inventario["tarta"] = {
    cantidad: 3,
    precio: 2.4,
    categoria: "dulce",
  };

  function agregarProducto(nombre, cantidad, precio, categoria) {
    if (!inventario[nombre]) {
      inventario[nombre] = {
        cantidad: Number(cantidad),
        precio: Number(precio),
        categoria: categoria,
      };
    } else {
      alert("EL producto ya existe");
      return;
    }
  }

  function eliminarProducto(nombre) {
    if (!inventario[nombre]) {
      alert("El producto no existe");
      return;
    }
    delete inventario[nombre];
  }

  function buscarProducto(nombre) {
    return inventario[nombre] || null;
  }

  function actualizarInventario(nombre, cantidad) {
    if (inventario[nombre]) {
      inventario[nombre].cantidad += Number(cantidad);
    } else {
      alert("El producto no existe");
      return;
    }
    if (inventario[nombre].cantidad <= 0) {
      inventario[nombre].cantidad = 0;
      alert("Stock agotado");
    }
  }

  function ordenarProductosPorPrecio() {
    let lista = [];
    for (let nombre in inventario) {
      lista.push({ nombre, ...inv[nombre] });
    }
    lista.sort((a, b) => a.precio - b.precio);
    return lista;
  }

  function imprimirInventario() {
    let lista = [];
    for (let nombre in inventario) {
      let prod = inventario[nombre];
    }
    lista.push = {
      nombre: prod.nombre,
      cantidad: prod.cantidad,
      precio: prod.precio,
      categoria: prod.categoria,
    };
    return lista;
  }

  function filtrarProductorPorCategoria(categoria) {
    let lista = [];
    for (let nombre in inventario) {
      let prod = inventario[nombre];
      if (prod.categoria.toLowerCase() === categoria.toLowerCase()) {
        lista.push({
          nombre: prod.nombre,
          cantidad: prod.cantidad,
          precio: prod.precio,
        });
      }
    }
    return lista;
  }
  return {
    agregarProducto,
    eliminarProducto,
    buscarProducto,
    actualizarInventario,
    ordenarProductosPorPrecio,
    imprimirInventario,
    filtrarProductosPorCategoria,
  };
})();
