import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CarritoPage() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const navigate = useNavigate("");
  const [direccionEnvio, setDireccionEnvio] = useState("");
  const [observaciones, setObservaciones] = useState("");

  async function confirmarPedido() {
    const token = localStorage.getItem("token");

    const pedido = {
      direccionEnvio,
      observaciones,
      lineas: carrito.map((p) => ({
        productoId: p.productoId,
        cantidad: p.cantidad,
      })),
    };

    const respuesta = await fetch("http://localhost:8000/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(pedido),
    });

    const data = await respuesta.json();
    console.log("Pedido enviado:", data);
    navigate("/");
  }

  return (
    <>
      <h2>Carrito</h2>

      {carrito.map((p) => (
        <div key={p.productoId}>
          <h4>{p.nombre}</h4>
          <p>{p.precio}</p>
        </div>
      ))}

      <h3>Datos de envío</h3>

      <input
        type="text"
        placeholder="Dirección de envío"
        value={direccionEnvio}
        onChange={(e) => setDireccionEnvio(e.target.value)}
      />

      <textarea
        placeholder="Observaciones"
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
      />

      <button onClick={confirmarPedido}>Confirmar pedido</button>
    </>
  );
}

export default CarritoPage;
