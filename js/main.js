import { cargarDatos } from "./cargarDatos.js"; // funciones que rellenaran el html con la informacion del servidor
// import { cargarDatos, calcularPrecio } from "./cargarDatos.jquery.js"; // funciones que rellenaran el html con la informacion del servidor

window.onload = function () {
  cargarDatos();
};
