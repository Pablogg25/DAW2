import { get } from "./api.js";

const lista = document.getElementById("lista");
const paginador = document.getElementById("paginador");
const pageSize = document.getElementById("pageSize");
const filtro = document.getElementById("filtro");
const error = document.getElementById("error");

const datos = [];
localStorage.setItem("Paginas", pageSize.value);

async () => {
  try {
    datos = await get("users");
    pintar();
  } catch (e) {
    error.textContent = "Error: " + e.message;
  }
};

function pintar() {
  lista.innerHTML = "";
}
