// === MERCADILLO ===
const $negocio = (function () {
    // Array asociativo: clave = nombre del producto, valor = objeto con datos
    let inventario = {};

    // --- 1. Agregar producto ---
    function agregarProducto(nombre, cantidad, precio, categoria) {
        if (inventario[nombre]) {
            alert("El producto '" + nombre + "' ya existe.");
            return;
        }
        inventario[nombre] = {
            cantidad: Number(cantidad),
            precio: Number(precio),
            categoria: categoria
        };
    }

    // --- 2. Eliminar producto ---
    function eliminarProducto(nombre) {
        if (!inventario[nombre]) {
            alert("El producto '" + nombre + "' no existe.");
            return;
        }
        delete inventario[nombre];
    }

    // --- 3. Buscar producto ---
    function buscarProducto(nombre) {
        return inventario[nombre] || null;
    }

    // --- 4. Actualizar inventario ---
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

    // --- 5. Ordenar por precio ---
    function ordenarProductosPorPrecio() {
        return Object.entries(inventario)
            .sort((a, b) => a[1].precio - b[1].precio)
            .map(([nombre, datos]) => ({ nombre, ...datos }));
    }

    // --- 6. Imprimir inventario ---
    function imprimirInventario() {
        let lista = [];
        for (let nombre in inventario) {
            let prod = inventario[nombre];
            lista.push({
                nombre: nombre,
                categoria: prod.categoria,
                cantidad: prod.cantidad,
                precio: prod.precio,
                total: prod.cantidad * prod.precio
            });
        }
        return lista;
    }

    // --- 7. Filtrar por categoría ---
    function filtrarProductosPorCategoria(categoria) {
        let lista = [];
        for (let nombre in inventario) {
            let prod = inventario[nombre];
            if (prod.categoria === categoria) {
                lista.push({
                    nombre: nombre,
                    cantidad: prod.cantidad,
                    precio: prod.precio
                });
            }
        }
        return lista;
    }

    // Devolvemos solo los métodos necesarios
    return {
        agregarProducto,
        eliminarProducto,
        buscarProducto,
        actualizarInventario,
        ordenarProductosPorPrecio,
        imprimirInventario,
        filtrarProductosPorCategoria
    };
})();
