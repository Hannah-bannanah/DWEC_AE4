import { enviarRequest } from "./util/util.js";

/* 
  definimos las variables donde recogeremos la informacion relevante a nivel global
  para evitar sobrecarga (ya que el calculo de precio se realiza cada vez que el usuario
  modifica la seleccion). La recogida de informacion se ejecutara cada vez que se ejecute el
  script (en este caso, cada vez que se recarga la pagina)
*/
let infoPizza;
let ingredientes;

export const cargarDatos = async () => {
  infoPizza = await enviarRequest("GET", "../server/pizzas.json");
  ingredientes = await enviarRequest("GET", "../server/ingredientes.json");
  cargarIngredientes(ingredientes);
  cargarMasas(infoPizza.masas);
  cargarTamanios(infoPizza.tamanios);
  return;
};
/**
 * funcion que carga los ingredientes en la lista de chekboxes
 */
const cargarIngredientes = (listaIngredientes) => {
  // iteramos por la lista de ingredientes, generando los elementos
  // en la seccion de ingredientes del html
  const ingredientesNode = document.getElementById("ingredientes");
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
  //cargamos la lista de masas del servidor
  const masaNode = document.getElementById("masa");
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
  const tamaniosNode = document.getElementById("tamanio");
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
