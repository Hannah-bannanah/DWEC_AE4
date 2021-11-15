const restaurantesMarkers = {
  markerPaulina: {
    lat: 40.40628087645118,
    long: -3.6691110581564477,
    title: "La casina de Paulina",
  },
  markerPilpilar: {
    lat: 40.44507556112844,
    long: -3.699988648288108,
    title: "PizzalPilPilar",
  },
  markerIchicodes: {
    lat: 40.380508846347134,
    long: -3.714923188115733,
    title: "Ixchel's Hollywok",
  },
  markerBannanah: {
    lat: 40.422079139466184,
    long: -3.6965554207415274,
    title: "La Pizza Pagana de Jana",
  },
};
// const restaurantes = cargarRestaurantes();

function initMap() {
  navigator.geolocation.getCurrentPosition(myMapExec);

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

    for (const restaurante in restaurantesMarkers) {
      const lat = restaurantesMarkers[restaurante].lat;
      const long = restaurantesMarkers[restaurante].long;
      const title = restaurantesMarkers[restaurante].title;
      const markerOpt = {
        position: new google.maps.LatLng(lat, long),
        title: title,
      };
      let marker = new google.maps.Marker(markerOpt);
      // console.dir(marker);
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

    // const markerOpt = {
    //   // map: myMap,
    //   position: new google.maps.LatLng(coords.latitude, coords.longitude),
    //   title: "Paulina",
    // };

    // const googleMarker = new google.maps.Marker(markerOpt);
    // googleMarker.setMap(myMap);
  }
}
