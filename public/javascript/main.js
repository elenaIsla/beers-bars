
//!!!!!!-----ejercicio del learning unit

// function startMap() {

//     // Store Ironhack's coordinates
//     const ironhackBCN = { lat: 41.3977381,  lng: 2.190471916 };

//     // Initialize the map
//     const map = new google.maps.Map(document.getElementById('map'), 
//       {
//         zoom: 20,
//         center: ironhackBCN
//       }
//     );

//     // Add a marker for Ironhack Barcelona
//     const IronhackBCNMarker = new google.maps.Marker({
//       position: {
//         lat: ironhackBCN.lat,
//         lng: ironhackBCN.lng
//       },
//       map: map,
//       title: "Barcelona Campus"
//     });


//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function (position) {
//         const user_location = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         };

//         // Center map with user location
//         map.setCenter(user_location);

//         // Add a marker for your user location
//         const ironhackBCNMarker = new google.maps.Marker({
//           position: {
//             lat: user_location.lat,
//             lng: user_location.lng
//           },
//           map: map,
//           title: "You are here."
//         });

//       }, function () {
//         console.log('Error in the geolocation service.');
//       });
//     } else {
//       console.log('Browser does not support geolocation.');
//     }
//     }
//     startMap();  

// !!!!!!-------aqui empieza mi codigo

window.onload = () => {
    const ironhackBCN = {
      lat: 41.386230, 
      lng: 2.174980
    };
     console.log('hola');
    const markers = []
    
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: ironhackBCN,
      disableDefaultUI: true
    });
  
    let center = {
      lat: undefined,
      lng: undefined
    }; 

//     function getBars() {
//         axios.get("/bars&beers/api")
//          .then( response => {
//              console.log(response.data.bars);
//            placeBars(response.data.bars);
//          })
//          .catch(error => {
//            console.log(error);
//          })
//        }
//     function placeBars(barmodels){
//         console.log('entra aqui');
//         barmodels.forEach(function(bar){
//             console.log(bar);
//           const center = {
//             lat: parseInt(bar.location.coordinates[0]),
//             lng: parseInt(bar.location.coordinates[1])
//           };
//           const pin = new google.maps.Marker({
//             position: center,
//             map: map,
//             title: bar.name
//           });
//           markers.push(pin);
//           console.log(markers);
//         });
//     }
// getBars();
    
const geocoder = new google.maps.Geocoder();

document.getElementById('submit').addEventListener('click', function () {
    geocodeAddress(geocoder, map);
});

function geocodeAddress(geocoder, resultsMap) {
  let address = document.getElementById('address').value;
    console.log('esto funciona');
  geocoder.geocode({ 'address': address }, function (results, status) {
    
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      console.log(results[0].geometry.location.lat());
      let marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      document.getElementById('latitude').value = results[0].geometry.location.lat();
      document.getElementById('longitude').value = results[0].geometry.location.lng();
    //   markers.push(marker);
      
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
    
  });
}
geocodeAddress(geocoder, map);

};

//!!!!!!------google plataform

// window.onload = () => {

// var geocoder;
//   var map;
//   function initialize() {
//     geocoder = new google.maps.Geocoder();
//     var latlng = new google.maps.LatLng(-34.397, 150.644);
//     var mapOptions = {
//       zoom: 8,
//       center: latlng
//     }
//     map = new google.maps.Map(document.getElementById('map'), mapOptions);
// }
// initialize();

// function codeAddress() {
//     var address = document.getElementById('address').value;
//     geocoder.geocode( { 'address': address}, function(results, status) {
//         console.log(status);
//       if (status == 'OK') {
//           console.log(results[0].geometry.location.lat());
//         map.setCenter(results[0].geometry.location);
//         var marker = new google.maps.Marker({
//             map: map,
//             position: results[0].geometry.location
//         });
//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     });
// }
// codeAddress();
// }


