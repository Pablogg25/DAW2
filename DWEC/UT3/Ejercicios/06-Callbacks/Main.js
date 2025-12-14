import { Validaciones } from "./Validaciones.js";
// document.getElementById("guardar").addEventListener("click", () => {
//   const nombre = Validaciones.validarNombre(document.getElementById("nombre"));
//   const contraseña = Validaciones.validarContraseña(
//     document.getElementById("password")
//   );
// });
document.getElementById("nombre").addEventListener("blur", () => {
  Validaciones.validarNombre(document.getElementById("nombre"));
});
