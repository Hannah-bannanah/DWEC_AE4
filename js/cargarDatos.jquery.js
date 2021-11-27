import { limpiarNodo } from "./util.js";
import * as validacion from "./validacion.js";
/*
 * Este archivo contiene funciones relacionadas con la carga de datos
 * de la pagina con jquery, necesarias para el requerimiento
 * 3 de la actividad
 */

$(document).ready(() => {
  //usamos $(document).ready() en vez de window.onload
  //carga inicial de la pagina
  $.when(cargarDatos()).then(() => {
    //recarga de la pagina a partir del boton de refrescar
    const refrescar = $("#refrescar"); //usamos notacion de jQuery para obtener elementos
    refrescar.click(cargarDatos); //usamos notacion de jQuery para los event listeners

    aniadirEventListeners();
  });
});
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
 * @returns el array de ingredientes
 */
const cargarDatos = async () => {
  // envolvemos las requests en un when para asegurarnos de que
  //solo devolvemos el resultado cuando ambas se han resuelto
  return $.when(
    $.get("../server/ingredientes.json"),
    $.get("../server/pizzas.json")
  ).done((ings, pizzas) => {
    //las respuestas se devuelven en forma de arrays
    ingredientes = ings[0];
    infoPizza = pizzas[0];

    //cargamos los elementos de la pagina
    cargarIngredientes(ingredientes);
    cargarMasas(infoPizza.masas);
    cargarTamanios(infoPizza.tamanios);
  });
};

/**
 * funcion que carga los ingredientes en la lista de chekboxes
 */
const cargarIngredientes = (listaIngredientes) => {
  //eliminamos la lista de ingredientes existente
  const ingredientesNode = $("#ingredientes"); // obtenemos y generamos todos los nodos con jquery
  limpiarNodo(ingredientesNode[0], "div"); //pasamos el argumento ingredientesNode[0] que contiene el nodo html

  // iteramos por la lista de ingredientes, generando los elementos
  // en la seccion de ingredientes del html
  $.each(listaIngredientes, (idx, ingrediente) => {
    //usamos el metodo $.each() en vez de forEach()
    //creamos wrapper usado para el formato de css aplicado
    const divWrapper = $("<div>");
    divWrapper.addClass("inline-column"); //usamos addClass() en vez de classList().add()
    divWrapper.appendTo(ingredientesNode); //usamos appendTo() en vez de appendChild()

    //generamos un id (el nombre del ingrediente sin espacios)
    const idIng = `ing-${ingrediente.nombre.split(" ").join("")}`;

    const chkbox = $(
      `<input type="checkbox" id = ${idIng} name = ${ingrediente.nombre
        .split(" ")
        .join("")} value ="true">`
    ); //definimos los attributos en la creacion en vez de aniadirlos al nodo uno a uno

    //situamos el checkbox en el documento
    divWrapper.append(chkbox); //usamos append() en vez de appendChild()

    //creamos la label
    const label = $("<label>");
    label.attr("for", idIng); //usamos attr() en vez de setAttribute()
    label.text(ingrediente.nombre); //usamos text() en vez de textContent
    //situamos la label en el documento
    divWrapper.append(label);
  });
};

/**
 * funcion que carga los tipos de masa en la lista de radio buttons
 */
const cargarMasas = (listaMasas) => {
  //eliminamos la lista existente
  const masaNode = $("#masa");
  limpiarNodo(masaNode[0], "div");
  //Iteramos por la lista de tipos de masa (seccion #masa)
  $.each(listaMasas, (index, masa) => {
    //Creamos el wrapper para cada radio button
    const divWrapperMasa = $("<div>");
    divWrapperMasa.addClass("inline-column");
    divWrapperMasa.appendTo(masaNode);
    //generamos el id
    const idMasa = `mas-${masa}`;
    //generamos los radio buttons y añadimos los atributos
    const rbmasa = $("<input>").attr({
      type: "radio",
      id: idMasa,
      name: "masas",
      value: masa,
    });
    //situamos la sección de radio buttons en el documento
    rbmasa.appendTo(divWrapperMasa);
    //creamos la label
    const etiquetaMasa = $("<label>");
    etiquetaMasa.attr("for", idMasa); //usamos attr() en vez de setAttribute()
    etiquetaMasa.text(masa); //usamos text() en vez de textContent
    //situamos la label en el documento
    divWrapperMasa.append(etiquetaMasa);
  });
};

/**
 * funcion que carga los tamaños de pizza en la lista de radio buttons
 */
const cargarTamanios = (listaTamanios) => {
  //eliminamos la lista existente
  const tamaniosNode = $("#tamanio");
  limpiarNodo(tamaniosNode[0], "div");

  //Iteramos por la lista de tipos de masa (seccion #masa)
  $.each(listaTamanios, (index, tamanio) => {
    //Creamos el wrapper para cada radio button
    const divWrapperTamanio = $("<div>");
    divWrapperTamanio.addClass("inline-column");
    divWrapperTamanio.appendTo(tamaniosNode);
    //generamos el id
    const idTamanio = `tam-${tamanio.nombre}`;
    //generamos los radio buttons y añadimos los atributos
    const rbtam = $("<input>").attr({
      type: "radio",
      id: idTamanio,
      name: "tamanios",
      value: tamanio.nombre,
    });
    //situamos la sección de radio buttons en el documento
    rbtam.appendTo(divWrapperTamanio);
    //creamos la label
    const etiquetaTam = $("<label>");
    etiquetaTam.attr("for", idTamanio); //usamos attr() en vez de setAttribute()
    etiquetaTam.text(tamanio.nombre); //usamos text() en vez de textContent
    //situamos la label en el documento
    divWrapperTamanio.append(etiquetaTam);
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
export function calcularPrecio() {
  let precio = 0;

  //calculamos el precio del tamanio elegido
  const tamanioElegido = $('input[name="tamanios"]:checked');
  //usamos tamnioElegido.length en vez de tamanioElegido para evaluar si se ha elegido un tamanio
  //ya que con jquery se crea un objeto en todo caso
  if (tamanioElegido.length !== 0)
    precio += infoPizza.tamanios.find(
      (tam) => tam.nombre === tamanioElegido[0].value //buscamos el tamanio cuyo nombre coincide con el elegido
    ).precio;

  //calculamos el precio de los ingredientes
  const ingredientesElegidos = $(
    '#opciones-pizza input[type="checkbox"]:checked'
  );
  $.each(ingredientesElegidos, (idx, ingElegido) => {
    //usamos $.each en vez de forEach()
    precio += ingredientes.find(
      (ing) => ing.nombre.split(" ").join("") === ingElegido.name
    ).precio;
  });

  //actualizamos el precio mostrado
  const infoPrecio = $("#info-precio");
  infoPrecio.text(`Precio: ${precio}\u20AC`); //usamos text() en vez de textContent
  infoPrecio.addClass("visible"); //usamos addClass() en vez de classList().add()

  return precio;
}

const aniadirEventListeners = () => {
  // asignamos los event listeners
  //validacion del formulario completo
  $("#submit").click(validacion.validarFormulario);

  //validacion inmediata de nombre
  $("#nombre").keyup(validacion.validarNombre);

  //validacion inmediata de apellidos
  $("#apellidos").keyup(validacion.validarApellidos);

  //validacion inmediata de la direccion
  $("#ConText2").keyup(function () {
    var direccion = document.getElementById("ConText2");
    var mensajeErrorDireccion = document.querySelector(".direccion-error");
    if (direccion.classList.contains("invalido")) {
      direccion.classList.remove("invalido");
      mensajeErrorDireccion.textContent = "";
    }
  });

  //validacion inmediata del telefono
  $("#telefono").keyup(validacion.validarTlf);

  //validacion inmediata del email
  $("#email").keyup(validacion.validarEmail);

  // validacion inmediata del minimo de ingredientes
  //y actualizacion del precio
  const ingredientesChkboxes = $('#ingredientes input[type="checkbox"]'); //esto devuelve un array
  $.each(ingredientesChkboxes, (idx, chkbox) => {
    $(chkbox).change(validacion.validarMinIngredientes);
    $(chkbox).change(calcularPrecio);
  });
  // console.dir(ingredientesChkboxes);

  //validacion inmediata de los radio button MASA
  const masaRadioButton = $("[name='masas']"); //cambiamos getElementsByName por un selector equivalente
  for (var i = 0; i < masaRadioButton.length; i++) {
    $(masaRadioButton[i]).click(validacion.validarMasa);
  }

  //validacion inmediata de los radio button TAMANIO
  //y actualizacion del precio
  const tamanioRadioButton = $("[name='tamanios']");
  for (var i = 0; i < tamanioRadioButton.length; i++) {
    $(tamanioRadioButton[i]).click(validacion.validarTamanio);
    $(tamanioRadioButton[i]).change(calcularPrecio);
  }

  // validacion inmediata de seleccion de restaurante
  $("#restaurante").change(validacion.validarRestaurante); //valida cada vez que cambia la seleccion

  //validacion inmediata de los terminos y condiciones
  const terminos = $("#terminos");
  terminos.click(validacion.validarTerminos);
};
