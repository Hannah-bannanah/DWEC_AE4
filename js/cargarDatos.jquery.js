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

const cargarMasas = (listaMasas) => {
  console.log("listaMasas", listaMasas);
};

const cargarTamanios = (listaTamanios) => {
  console.log("listaTamanios", listaTamanios);
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
