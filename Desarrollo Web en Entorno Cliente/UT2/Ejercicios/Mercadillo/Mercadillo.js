//Utilizar directamente JSON
let productos = {
   "tarta": {
      cantidad: 3,
      precio: 2.4,
      categoria: "dulce"
   }
};

// Utilizar Array
let inventario = [];
inventario["tarta"] = {
   cantidad: 3,
   precio: 2.4,
   categoria: "dulce"

}

/* Añade los productos si no existen(Comprobar si existen previamente
   Si el producto existe muestra un alert indicando que el producto existe*/
function agregarProducto(nombre, cantidad, precio, categoria) {
   if (inventario[nombre]) {
      alert("El producto " + nombre + " ya existe");
      return;
   }
   inventario[nombre] = {
      cantidad: Number(cantidad),
      precio: Number(precio),
      categoria: (categoria)
   }
}

/* Elimina un producto del inventario.
   Si el producto no existe muestra un alert indicando que producto no existe. */
function eliminarProducto(nombre) {
   if (!inventario[nombre]) {
      alert("No existe ese producto");
      return;
   }
   delete inventario[nombre];
}

/*  Devuelve el objeto con la información del Producto*/
function buscarProducto(nombre) {
   return inventario[nombre] || null;
}

/* Incrementa o decrementa el stock según la cantidad indicada
   Si la reducción deja el stock a 0 se mostrará un alert solicitando la reposición.*/
function actualizarInventario(nombre, cantidad) {
   if (!inventario[nombre]) {
      alert("El producto '" + nombre + "' no existe.");
      return;
   }
   inventario[nombre].cantidad += Number(cantidad);

   if (inventario[nombre].cantidad <= 0) {
      inventario[nombre].cantidad = 0;
      alert("¡Stock agotado! Se necesita reposición de '" + nombre + "'.");
   }

}

/* Devuelve una lista ordenada de forma ascendente
   El resultado es un nuevo array, cuidado que no tienes el nombre.*/
function ordenarProductosPorPrecio() {
   return Object.entries(inventario)
      .sort((a, b) => a[1].precio - b[1].precio)
      .map(([nombre, datos]) => ({ nombre, ...datos }));
}

/* Devuelve una lista con el informe de inventario, el
   cual muestra el “nombre”, “categoría”, “cantidad”, “precio” y “total”
   (cantidad*precio).*/
function imprimirInventario() {
   let lista = [];
   for (let nombre in inventario) {
      let prod = inventario[nombre];
   }
   lista.push = {
      nombre: prod.nombre,
      cantidad: prod.cantidad,
      precio: prod.precio,
      categoria: prod.categoria
   }
   return lista;
}

/* Devuelve una lista con los productos de una categoría. Muestra el “nombre”, “cantidad”, “precio”*/
function filtrarProductorPorCategoria(categoria) {
   let lista = [];
   for (let nombre in inventario) {
      let prod = inventario[nombre]
      if (prod.categoria.toLowerCase() === categoria.toLowerCase()) {
         lista.push({
            nombre: prod.nombre,
            cantidad: prod.cantidad,
            precio: prod.precio
         })

      }
   }
   return lista;
}

