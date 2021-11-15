const cargarIngredientes = () => {
  const xhr = new XMLHttpRequest();
  const ingredientesNode = document.getElementById("ingredientes");
  xhr.open("GET", "./server/ingredientes.json", true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const ingredientesPizza = JSON.parse(xhr.responseText);
      ingredientesPizza.forEach((ingrediente) => {
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
  };
  xhr.send();
};

cargarIngredientes();

// let restaurantes;
// const cargarRestaurantes = (restaurantes) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", "./server/restaurantes.json", true);
//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       restaurantes = JSON.parse(xhr.responseText);
//     }
//   };
//   xhr.send();
// };

// cargarRestaurantes();
// console.log(restaurantes);
