window.onload = () => {
    const ironhackBCN = {
      lat: 41.386230, 
      lng: 2.174980
    };
  
    const markers = []
    
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: ironhackBCN,
    });
  
    let center = {
      lat: undefined,
      lng: undefined
    }; 

    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //     const user_location = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //     }
    //     });
    // };
        
    // // Center map with user location
    // map.setCenter(user_location);

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
    
    function getoneBar(bar){
        console.log('hola hola')
        
        bar.forEach((barmodel) => {
           
            
            const center = {
                lat: barmodel.location.coordinates[1],
                lng: barmodel.location.coordinates[0]
                };
            const pin = new google.maps.Marker({
                position: center,
                map: map,
                title: barmodel.name
                });
            markers.push(pin);
            console.log(center.lng)
            console.log(pin);
            
        })
           
        
    }


    function placeBars(barmodels){
        console.log('entra aqui');
        let center = {
            lat: barmodel[6].location.coordinates[1],
            lng: barmodel[6].location.coordinates[0]
          }; 
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 20,
            center: center,
          });
        barmodels.forEach((bar) => {
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