/**
 * Funcion reutilizable para abrir un archivo y devolver los datos
 * @param {*} method metodo http usado
 * @param {*} path ruta al archivo
 */
function enviarRequest(method, path) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, path, true);
    xhr.onload = function () {
      if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
      else reject(xhr.response);
    };

    xhr.send();
  });
  return promise;
}

/**
 * funcion que carga los ingredientes en la lista de chekboxes
 */
const cargarIngredientes = () => {
  enviarRequest("GET", "./server/ingredientes.json").then(
    (listaIngredientes) => {
      const ingredientesNode = document.getElementById("ingredientes");
      listaIngredientes.forEach((ingrediente) => {
        const divWrapper = document.createElement("div");
        divWrapper.className = "inline-column";
        ingredientesNode.appendChild(divWrapper);

        const idIng = `ing-${ingrediente.nombre.split(" ").join("")}`;
        const chkbox = document.createElement("input");
        chkbox.setAttribute("type", "checkbox");
        chkbox.setAttribute("id", idIng);
        chkbox.setAttribute("name", idIng);
        chkbox.setAttribute("value", "true");

        divWrapper.appendChild(chkbox);

        const label = document.createElement("label");
        label.setAttribute("for", idIng);
        label.textContent = ingrediente.nombre;
        divWrapper.appendChild(label);
      });
    }
  );
};

cargarIngredientes();
