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

}

/* Elimina un producto del inventario.
   Si el producto no existe muestra un alert indicando que producto no existe. */
function eliminarProducto(nombre) {

}

/*  Devuelve el objeto con la información del Producto*/
function buscarProducto(nombre) {

}

/* Incrementa o decrementa el stock según la cantidad indicada
   Si la reducción deja el stock a 0 se mostrará un alert solicitando la reposición.*/
function actualizarInventario(nombre, cantidad) {

}

/* Devuelve una lista ordenada de forma ascendente
   El resultado es un nuevo array, cuidado que no tienes el nombre.*/
function ordenarProductosPorPrecio() {

}

/* Devuelve una lista con el informe de inventario, el
   cual muestra el “nombre”, “categoría”, “cantidad”, “precio” y “total”
   (cantidad*precio).*/
function imprimirInventario() {

}

/* Devuelve una lista con los productos de una categoría. Muestra el “nombre”, “cantidad”, “precio”*/
function filtrarProductorPorCategoria(categoria) {

}