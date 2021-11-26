/**
 * Funcion que elimina todos los elementos de un nodo
 * que cumplan la query
 * @param {} nodo a limipiar
 * @param {*} query de los elementos a eliminar
 */
export function limpiarNodo(nodo, query) {
  const elementosAEliminar = nodo.querySelectorAll(query);
  elementosAEliminar.forEach((elem) => {
    elem.parentElement.removeChild(elem);
  });
}

/**
 * Funcion que lanza una peticion al servidor y devuelve la respuesta
 * @param {*} method metodo http usado
 * @param {*} path ruta al archivo
 */
export function enviarRequest(method, path) {
  // envolvemos la funcion en una Promise para poder usarla en funciones
  // en combinacion con then() o await
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
