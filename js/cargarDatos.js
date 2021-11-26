import * as util from "./util.js";
import * as validacion from "./validacion.js";
/*
 * Este archivo contiene funciones relacionadas con la carga de datos
 * de la pagina con javascript puro, necesarias para los requerimientos
 * 1 y 2 de la actividad
 */

window.onload = () => {
  //carga inicial de la pagina
  cargarDatos();

  //recarga de la pagina a partir del boton de refrescar
  const refrescar = document.getElementById("refrescar");
  refrescar.addEventListener("click", () => {
    cargarDatos();
  });
};

/* 
  definimos las variables donde recogeremos la informacion relevante a nivel global
  para evitar sobrecarga (ya que el calculo de precio se realiza cada vez que el usuario
  modifica la seleccion). La recogida de informacion se ejecutara cada vez que se ejecute el
  script (en este caso, cada vez que se recarga la pagina o se pulsa el boton de Refrescar)
*/
let infoPizza;
let ingredientes;

/**
 * funcion que obtiene los datos del servidor
 * y carga los elementos relevantes de la pagina
 */
const cargarDatos = async () => {
  //obtenemos los datos del servidor
  infoPizza = await util.enviarRequest("GET", "../server/pizzas.json");
  ingredientes = await util.enviarRequest("GET", "../server/ingredientes.json");

  // llamamos a las funciones que cargaran los nodos html
  cargarIngredientes(ingredientes);
  cargarMasas(infoPizza.masas);
  cargarTamanios(infoPizza.tamanios);

  aniadirEventListeners();
};

/**
 * funcion que carga los ingredientes en la lista de chekboxes
 */
const cargarIngredientes = (listaIngredientes) => {
  //eliminamos la lista de ingredientes existente
  const ingredientesNode = document.getElementById("ingredientes");
  util.limpiarNodo(ingredientesNode, "div");

  // iteramos por la lista de ingredientes, generando los elementos
  // en la seccion de ingredientes del html
  listaIngredientes.forEach((ingrediente) => {
    //creamos wrapper usado para el formato de css aplicado
    const divWrapper = document.createElement("div");
    divWrapper.className = "inline-column";
    ingredientesNode.appendChild(divWrapper);

    //generamos un id (el nombre del ingrediente sin espacios)
    const idIng = `ing-${ingrediente.nombre.split(" ").join("")}`;
    //creamos el checkbox
    const chkbox = document.createElement("input");
    chkbox.setAttribute("type", "checkbox");
    chkbox.setAttribute("id", idIng);
    chkbox.setAttribute("name", ingrediente.nombre.split(" ").join(""));
    chkbox.setAttribute("value", "true");
    //situamos el checkbox en el documento
    divWrapper.appendChild(chkbox);

    //creamos la label
    const label = document.createElement("label");
    label.setAttribute("for", idIng);
    label.textContent = ingrediente.nombre;
    //situamos la label en el documento
    divWrapper.appendChild(label);
  });
};

const cargarMasas = (listaMasa) => {
  //eliminamos la lista de ingredientes existente
  const masaNode = document.getElementById("masa");
  util.limpiarNodo(masaNode, "div");

  listaMasa.forEach((masas) => {
    const divWrapper = document.createElement("div");
    divWrapper.className = "inline-column";
    masaNode.appendChild(divWrapper);

    //generamos un id (el nombre del tipo de masa sin espacios)
    const idMas = `mas-${masas}`;
    //creamos los radiobuttons
    const rdio = document.createElement("input");
    rdio.setAttribute("type", "radio");
    rdio.setAttribute("id", idMas);
    rdio.setAttribute("name", "masas");
    rdio.setAttribute("value", masas);
    //situamos los radiobuttons en el documento
    divWrapper.appendChild(rdio);

    //creamos la label
    const label = document.createElement("label");
    label.setAttribute("for", idMas);
    label.textContent = masas;
    //situamos la label en el documento
    divWrapper.appendChild(label);
  });
};

const cargarTamanios = (listaTamanios) => {
  //eliminamos la lista de ingredientes existente
  const tamaniosNode = document.getElementById("tamanio");
  util.limpiarNodo(tamaniosNode, "div");

  listaTamanios.forEach((tamanios) => {
    const divWrapper = document.createElement("div");
    divWrapper.className = "inline-column";
    tamaniosNode.appendChild(divWrapper);

    //generamos un id (el tamaño sin espacios)
    const idTam = `tam-${tamanios.nombre}`;
    //creamos los radiobuttons
    const rdio = document.createElement("input");
    rdio.setAttribute("type", "radio");
    rdio.setAttribute("id", idTam);
    rdio.setAttribute("name", "tamanios");
    rdio.setAttribute("value", tamanios.nombre);
    //situamos los radiobuttons en el documento
    divWrapper.appendChild(rdio);

    //creamos la label
    const label = document.createElement("label");
    label.setAttribute("for", idTam);
    label.textContent = tamanios.nombre;
    //situamos la label en el documento
    divWrapper.appendChild(label);
  });
};

/*
 *============= CALCULO DE PRECIO =============
 */
/**
 * Funcion que calcula el precio de la pizza segun
 * la cantidad de ingredientes y el tamanio elegidos
 * @returns el precio
 */
function calcularPrecio() {
  let precio = 0;
  //calculamos el precio del tamanio elegido
  const tamanioElegido = document.querySelector(
    'input[name="tamanios"]:checked'
  );
  if (tamanioElegido != null)
    precio += infoPizza.tamanios.find(
      (tam) => tam.nombre === tamanioElegido.value //buscamos el tamanio cuyo nombre coincide con el elegido
    ).precio;

  //calculamos el precio de los ingredientes
  const ingredientesElegidos = document.querySelectorAll(
    '#opciones-pizza input[type="checkbox"]:checked'
  );
  ingredientesElegidos.forEach((ingElegido) => {
    precio += ingredientes.find(
      (ing) => ing.nombre.split(" ").join("") === ingElegido.name
    ).precio;
  });

  //actualizamos el precio mostrado
  const infoPrecio = document.getElementById("info-precio");
  infoPrecio.textContent = `Precio: ${precio}\u20AC`;
  infoPrecio.classList.add("visible");

  return precio;
}

const aniadirEventListeners = () => {
  // asignamos los event listeners
  submit.addEventListener("click", validacion.validarFormulario); //validacion del formulario completo

  //validacion inmediata de nombre
  nombre.addEventListener("keyup", validacion.validarNombre);

  //validacion inmediata de apellidos
  apellidos.addEventListener("keyup", validacion.validarApellidos);

  //validacion inmediata de la direccion
  ConText2.addEventListener("keyup", function () {
    var direccion = document.getElementById("ConText2");
    var mensajeErrorDireccion = document.querySelector(".direccion-error");
    if (direccion.classList.contains("invalido")) {
      direccion.classList.remove("invalido");
      mensajeErrorDireccion.textContent = "";
    }
  });

  //validacion inmediata del telefono
  telefono.addEventListener("keyup", validacion.validarTlf);

  //validacion inmediata del email
  email.addEventListener("keyup", validacion.validarEmail);

  // validacion inmediata del minimo de ingredientes
  //y actualizacion del precio
  const ingredientesChkboxes = document.querySelectorAll(
    '#opciones-pizza input[type="checkbox"]'
  );
  ingredientesChkboxes.forEach((chkbox) => {
    chkbox.addEventListener("change", validacion.validarMinIngredientes);
    chkbox.onchange = calcularPrecio;
  });

  //validacion inmediata de los radio button MASA
  const masaRadioButton = document.getElementsByName("masas");
  for (var i = 0; i < masaRadioButton.length; i++) {
    masaRadioButton[i].addEventListener("click", validacion.validarMasa);
  }

  //validacion inmediata de los radio button TAMANIO
  //y actualizacion del precio
  const tamanioRadioButton = document.getElementsByName("tamanios");
  for (var i = 0; i < tamanioRadioButton.length; i++) {
    tamanioRadioButton[i].addEventListener("click", validacion.validarTamanio);
    tamanioRadioButton[i].onchange = calcularPrecio;
  }

  // validacion inmediata de seleccion de restaurante
  restaurante.addEventListener("change", validacion.validarRestaurante); //valida cada vez que cambia la seleccion

  //validacion inmediata de los terminos y condiciones
  const terminos = document.getElementById("terminos");
  terminos.addEventListener("click", validacion.validarTerminos);
};
