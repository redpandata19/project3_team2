d3.json("large_airport_data.json").then(function(data) {
    // Once the JSON file is loaded and parsed, you can work with its data here
    createMarkers(data);
}).catch(function(error) {
    // Handle any errors that occur during loading or parsing
    console.error(error);
});

function createMap(airportInfo) {
    // Create the tile layer that will be the background of the map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create a baseMaps object to hold the streetmap layer
    let baseMaps = {
        "Street Map": streetmap
    };

    // Create an overlayMaps object to hold the airport data
    let overlayMaps = {
        "Airport Locations": airportInfo
    };

    // Create the map object with options
    let map = L.map("map", {
        center: [38.5, -98],
        zoom: 4.5,
        layers: [streetmap, airportInfo]
    });

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}

function createMarkers(response) {


    // this code is necessary for the data to read as an array and not a generic object
    const arr = Object.keys(response).map(key => response[key])

    // Initialize an array to hold airport markers
    let airportInfo = [];

    // Loop through the airport data.
    for (let i = 0; i < arr.length; i++) {

          // For each airport, create a marker, and bind a popup with the location name and IATA code.
        let airportMarker = L.marker([arr[i].lat, arr[i].long])
            .bindPopup("<h3>Location: " + arr[i].name + "</h3>" + "<hr>" + "<h3>Iata Code: " + arr[i].iata_code + "</h3>");

        // Add the marker to the airportInfo array.
        airportInfo.push(airportMarker);
    }

    // Create a layer group from the airport markers array.
    let airportLayer = L.layerGroup(airportInfo);

    // Pass the airport layer to the createMap function.
    createMap(airportLayer);
}




document.getElementById("mainclick").addEventListener("click", function () {
    window.location.href = "info.html"; // Change the URL to the desired destination page
});
  
function myFunction() {
       window.location.href = "info.html"; // Change the URL to the desired destination page
    // Add your button functionality here
  }
  



