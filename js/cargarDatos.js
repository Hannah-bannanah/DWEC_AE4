import { enviarRequest } from "./util/util.js";

/**
 * funcion que carga los ingredientes en la lista de chekboxes
 */
export const cargarIngredientes = async () => {
  //cargamos la lista de ingredientes del servidor
  const listaIngredientes = await enviarRequest(
    "GET",
    "../server/ingredientes.json"
  );

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

// cargarIngredientes();

export const cargarMasas = async () => {
  //cargamos la lista de masas del servidor
  const pizzas = await enviarRequest("GET", "../server/pizzas.json");
  const listaMasa = pizzas.masas;
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

// cargarMasas();

export const cargarTamanios = async () => {
  //cargamos la lista de tamaños del servidor
  const pizzas = await enviarRequest("GET", "../server/pizzas.json");
  const listaTamanios = pizzas.tamanios;
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

// cargarTamanios();
