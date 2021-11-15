let restaurantesMarkers = []; //variable que contendra los restaurantes

function initMap() {
  cargarRestaurantes() //obtenemos los datos de los restaurantes
    .then((restaurantes) => {
      //esto no se ejecuta hasta que cargarRestaurantes() haya devuelto una lista de restaurantes
      restaurantesMarkers = restaurantes;
      navigator.geolocation.getCurrentPosition(myMapExec);
    });
}

function cargarRestaurantes() {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./server/restaurantes.json", true);
    xhr.onload = () => {
      if (xhr.status !== 200) {
        reject("error en la xml request");
      } else {
        const restaurantes = JSON.parse(xhr.responseText);
        resolve(restaurantes);
      }
    };
    xhr.send();
  });
  return promise;
}

function myMapExec(myPosition) {
  const coords = myPosition.coords;
  const myMapProperties = {
    center: new google.maps.LatLng(coords.latitude, coords.longitude),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  const myMap = new google.maps.Map(
    document.getElementById("googleMap"),
    myMapProperties
  );

  // iteramos sobre el array de restaurantes para crear marcadores
  for (const restaurante of restaurantesMarkers) {
    const lat = restaurante.lat;
    const long = restaurante.long;
    const nombre = restaurante.nombre;

    const markerOpt = {
      position: new google.maps.LatLng(lat, long),
      title: nombre,
    };
    let marker = new google.maps.Marker(markerOpt);
    marker.setMap(myMap);
    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: markerOpt.title,
      });

      infoWindow.open({
        anchor: marker,
        myMap,
        shouldFocus: false,
      });
    });
  }
}
