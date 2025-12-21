import { get } from "./api.js";
import { crearPaginador, mostrarDatos } from "./utils.js";

const contenedor = document.getElementById("contenedor");
const paginador = document.getElementById("paginador");
const pageSize = document.getElementById("pageSize");
const filtro = document.getElementById("filtro");
const error = document.getElementById("error");

let datos = [];
let paginaActual = 1;
localStorage.setItem("Paginas", pageSize.value);
