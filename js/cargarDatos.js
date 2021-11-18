import { enviarRequest } from "./util/util.js";

/**
 * funcion que carga los ingredientes en la lista de chekboxes
 */
const cargarIngredientes = async () => {
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
    chkbox.setAttribute("name", idIng);
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

cargarIngredientes();
