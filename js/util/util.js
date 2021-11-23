/**
 * Funcion reutilizable para abrir un archivo y devolver los datos
 * @param {*} method metodo http usado
 * @param {*} path ruta al archivo
 */
export function enviarRequest(method, path) {
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

export function getJQuery(path) {
  return $.get(path);
}
