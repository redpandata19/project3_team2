// get data from the Flask endpoint
d3.json("http://127.0.0.1:5000/api/v1.0/airports").then(function (data) {
    // console.log(importedData);
    createMarkers(data)
  
});
   
function createMap(airportInfo) {
    // Create the tile layer that will be the background of the map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create a baseMaps object for the street layer
    let baseMaps = {
        "Street Map": streetmap
    };

    // Create an overlayMaps object for the airport markers
    let overlayMaps = {
        "Airport Locations": airportInfo
    };

    // Create the map object centered on KS and zoomed in on america
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


    // Initialize an array to hold airport markers
    let airportInfo = [];

    // Loop through the airport data.
    for (let i = 0; i < response.length; i++) {

          // For each airport, create a marker, and bind a popup with the location name and IATA code.
        let airportMarker = L.marker([response[i].latitude_deg, response[i].longitude_deg])
            .bindPopup("<h3>Location: " + response[i].airport_name + "</h3>" + "<hr>" + "<h3>Iata Code: " + response[i].iata_code + "</h3>");

        // Add the marker to the airportInfo array.
        airportInfo.push(airportMarker);
    }

    // Create a layer group from the airport markers array.
    let airportLayer = L.layerGroup(airportInfo);

    // Pass the airport layer to the createMap function.
    createMap(airportLayer);
}

// navigates to the info.html page 
function myFunction() {
       window.location.href = "info.html"; // Change the URL to the desired destination page
      }
  



