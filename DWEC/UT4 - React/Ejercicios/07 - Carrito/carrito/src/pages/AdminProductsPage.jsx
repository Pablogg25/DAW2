import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../core/API.js";
function AdminProductsPage() {
  const [producto, setProducto] = useState({});
  const navigate = useNavigate("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nuevoValor = value;
    if (name === "precio" || name === "stock") {
      nuevoValor = Number(value);
    }
    let actualizado = { ...producto, [name]: nuevoValor };
    setProducto(actualizado);
  };

  async function crearProducto() {
    console.log(producto);
    API.crearProducto(producto);
    navigate("");
  }
  return (
    <>
      <label htmlFor="">Nombre</label>
      <input type="text" name="nombre" onChange={handleChange} />
      <label htmlFor="">Descripcion</label>
      <input type="text" name="descripcion" onChange={handleChange} />
      <label htmlFor="">Precio</label>
      <input type="text" name="precio" onChange={handleChange} />
      <label htmlFor="">Stock</label>
      <input type="text" name="stock" onChange={handleChange} />
      <label htmlFor="">Categoria</label>
      <input type="text" name="categoria" onChange={handleChange} />
      <button onClick={crearProducto}>Crear Producto</button>
      <button onClick={() => navigate("/")}>Volver</button>
    </>
  );
}

export default AdminProductsPage;
