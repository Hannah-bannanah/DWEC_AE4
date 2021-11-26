/* 
  definimos las variables donde recogeremos la informacion relevante a nivel global
  para evitar sobrecarga (ya que el calculo de precio se realiza cada vez que el usuario
  modifica la seleccion). La recogida de informacion se ejecutara cada vez que se ejecute el
  script (en este caso, cada vez que se recarga la pagina)
*/
let infoPizza;
let ingredientes;

// export const cargarDatos = async () => {
//   // no necesitamos esperar a que el servidor devuelva la lista
//   // de ingredientes antes de solicitar la lista de pizzas
//   // si fuera necesario, deberiamos encadenar las peticiones.
//   $.get("../server/ingredientes.json")
//     .done((response) => {
//       ingredientes = response;
//       // console.log("ingredientes", ingredientes);
//       cargarIngredientes(ingredientes);
//     })
//     .fail((err) => alert(err));
//   $.get("../server/pizzas.json")
//     .done((response) => {
//       infoPizza = response;
//       // console.log('infoPizza', infoPizza);
//       cargarMasas(infoPizza.masas);
//       cargarTamanios(infoPizza.tamanios);
//     })
//     .fail((err) => alert(err));
// };

export const cargarDatos = async () => {
  // no necesitamos esperar a que el servidor devuelva la lista
  // de ingredientes antes de solicitar la lista de pizzas
  // si fuera necesario, deberiamos encadenar las peticiones.
  return $.get("../server/ingredientes.json")
    .done((response) => {
      ingredientes = response;
      cargarIngredientes(ingredientes);
      $.get("../server/pizzas.json").done((response) => {
        infoPizza = response;
        cargarMasas(infoPizza.masas);
        cargarTamanios(infoPizza.tamanios);
      });
    })
    .fail((err) => alert(err));
};

/**
 * funcion que carga los ingredientes en la lista de chekboxes
 */
const cargarIngredientes = (listaIngredientes) => {
  // iteramos por la lista de ingredientes, generando los elementos
  // en la seccion de ingredientes del html
  const ingredientesNode = $("#ingredientes"); //generamos todos los nodos con jquery
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
  console.log("listaMasas", listaMasas);
  const masaNode = $("#masa");
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
    "type" : "radio",
    "id": idMasa,
    "name": "masa",
    "value": masa,
  }) 
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
  console.log("listaTamanios", listaTamanios);
  const tamaniosNode = $("#tamanio");
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
    "type" : "radio",
    "id": idTamanio,
    "name": "tamanios",
    "value": tamanio.nombre,
  }) 
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
    console.log("ingredientes", ingredientes);
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
