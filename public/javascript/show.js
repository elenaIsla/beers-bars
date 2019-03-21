window.onload = () => {
    const ironhackBCN = {
      lat: 41.386230, 
      lng: 2.174980
    };
     console.log('hola');
    const markers = []
    
    // const map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 13,
    //   center: center,
    // });
  
    let center = {
      lat: undefined,
      lng: undefined
    }; 

    function getBars() {
        axios.get("/bars&beers/api")
         .then( response => {
             console.log(response.data.bars);
        //    placeBars(response.data.bars);
            getoneBar(response.data.bars);
         })
         .catch(error => {
           console.log(error);
         })
       }
// colocar un marker
    
    function getoneBar(barmodel){
        let center = {
            lat: barmodel[6].location.coordinates[1],
            lng: barmodel[6].location.coordinates[0]
          }; 
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 20,
            center: center,
          });
        const IronhackBCNMarker = new google.maps.Marker({
            position: {
            lat: barmodel[6].location.coordinates[1],
            lng: barmodel[6].location.coordinates[0],
            },
            map: map,
            title: "poner un marker"
        });
    }


    function placeBars(barmodels){
        console.log('entra aqui');
        barmodels.forEach(function(bar){
            console.log(bar);
          const center = {
            lat: parseInt(bar.location.coordinates[1]),
            lng: parseInt(bar.location.coordinates[0])
          };
          const pin = new google.maps.Marker({
            position: center,
            map: map,
            title: bar.name
          });
          markers.push(pin);
          console.log(pin);
        });
    }
getBars();



}