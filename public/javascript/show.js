window.onload = () => {
    const ironhackBCN = {
      lat: 41.386230, 
      lng: 2.174980
    };
     console.log('hola');
    const markers = []
    
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: ironhackBCN
    });
  
    let center = {
      lat: undefined,
      lng: undefined
    }; 

    function getBars() {
        axios.get("/bars&beers/api")
         .then( response => {
             console.log(response.data.bars);
           placeBars(response.data.bars);
         })
         .catch(error => {
           console.log(error);
         })
       }
// colocar un marker
    
// function getoneBar() {
//     axios.get("/bars&beers/api")
//      .then( response => {
//          console.log(response.data.bars);
        
//      })
//      .catch(error => {
//        console.log(error);
//      })
//    }


    function placeBars(barmodels){
        console.log('entra aqui');
        barmodels.forEach(function(bar){
            console.log(bar);
          const center = {
            lat: parseInt(bar.location.coordinates[0]),
            lng: parseInt(bar.location.coordinates[1])
          };
          const pin = new google.maps.Marker({
            position: center,
            map: map,
            title: bar.name
          });
          markers.push(pin);
          console.log(markers);
        });
    }
// getBars();



}