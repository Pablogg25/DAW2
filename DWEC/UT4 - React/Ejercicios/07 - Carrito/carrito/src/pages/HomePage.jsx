import React, { useEffect, useState } from "react";
import API from "../core/API";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [activo, setActivo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarProductos() {
      const lista = await API.obtenerProductos(categoria, activo);
      setProductos(lista);
    }
    cargarProductos();
  }, [categoria, activo]);

  function añadirAlCarrito(p) {
    const nuevoCarrito = [...carrito, p];
    setCarrito(nuevoCarrito);
    console.log(carrito);
    // console.log(localStorage.getItem("token"));
    // localStorage.removeItem("token");
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  }
  function handleChange(p, e) {
    p.cantidad = e.target.value;
  }
  function escogerCategoria(e) {
    const cat = e.target.value;
    console.log(cat);
    setCategoria(cat);
  }
  function escogerActivos(e) {
    setActivo(e.target.checked);
  }
  return (
    <>
      <div>HomePage</div>
      <button onClick={() => navigate("/adminProducts")}>Crear Producto</button>
      <button onClick={() => navigate("/carrito")}>Carrito</button>
      <button onClick={() => navigate("/inicioSesion")}>Iniciar Sesion</button>
      <br />

      <select name="" id="" onChange={(e) => escogerCategoria(e)}>
        <option defaultValue={""} selected disabled>
          Selecciona la categoria
        </option>
        <option value="">Todos</option>
        <option value="Electrónica">Electronica</option>
        <option value="Accesorios">Accesorios</option>
        <option value="Audio">Audio</option>
        <option value="Cables">Cables</option>
      </select>
      <label>Solo productos activos</label>
      <input type="checkbox" onChange={(e) => escogerActivos(e)} />
      {productos.map((p) => (
        <div key={p.productoId}>
          <h4>{p.nombre}</h4>
          <p>{p.descripcion}</p>
          <p>{p.precio}</p>
          <p>Stock: {p.stock}</p>
          <input
            type="number"
            min={1}
            max={p.stock}
            onChange={(e) => handleChange(p, e)}
            disabled={p.stock === 0}
          />
          <button onClick={() => añadirAlCarrito(p)}>Añadir al carrito</button>
        </div>
      ))}
    </>
  );
}

export default HomePage;
