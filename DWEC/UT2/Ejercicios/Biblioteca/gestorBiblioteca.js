import Libro from "./Libro.js";
import Autor from "./Autor.js";
import Biblioteca from "./Biblioteca.js";
import { datosIniciales } from "./datos.js";

const $biblio = (function () {
  const libros = [];
  const autores = [];
  const bibliotecas = [];

  function generarHTMLListadoAutores() {}
  function generarHTMLListadoBibliotecas() {}
  function generarHTMLListadoLibros() {}
  function buscarLibrosPorTitulo(/*$titulo*/) {}
  function buscarLibrosPorAutor(/*$autor*/) {}
  function generarHTMLResultadoBuscador(/*$objeto*/) {}
  function buscarLibro($libroId) {}
  function buscarAutor($autor) {}
  function buscarBiblioteca($bibliotecaId) {}
  function crearLibro($libro) {}
  function crearAutor($autor) {}
  function crearBiblioteca($biblioteca) {}
  function borrarLibro($libroId) {}
  function borrarAutor($autorId) {}
  function borrarBiblioteca($bibliotecaId) {}
  function devolverPrestamo($libro) {}
  function crearPrestamo($libro) {}

  return {
    generarHTMLListadoAutores,
    generarHTMLListadoBibliotecas,
    generarHTMLListadoLibros,
    buscarLibrosPorTitulo,
    buscarLibrosPorAutor,
    generarHTMLResultadoBuscador,
    buscarLibro,
    buscarAutor,
    buscarBiblioteca,
    crearLibro,
    crearAutor,
    crearBiblioteca,
    borrarLibro,
    borrarAutor,
    borrarBiblioteca,
    devolverPrestamo,
    crearPrestamo,
  };
})();
