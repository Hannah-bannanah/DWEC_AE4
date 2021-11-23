/**
 * funcion que carga los ingredientes en la lista de chekboxes
 */
const cargarIngredientes = () => {
  //enviamos la request por el metodo .get() de jquery
  $.get("../server/ingredientes.json")
    .done((listaIngredientes) => {
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

        //creamos el checkbox
        const chkbox = $("<input>");
        chkbox.attr("type", "checkbox"); //usamos att() en vez de setAttribute()
        chkbox.attr("id", idIng);
        chkbox.attr("name", idIng);
        chkbox.attr("value", "true");
        //situamos el checkbox en el documento
        divWrapper.append(chkbox); //usamos append() en vez de appendChild()

        //creamos la label
        const label = $("<label>");
        label.attr("for", idIng);
        label.text(ingrediente.nombre); //usamos text() en vez de textContent
        //situamos la label en el documento
        divWrapper.append(label);
      });
    })
    .fail((err) => console.log(err));
};

cargarIngredientes();
