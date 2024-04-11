// get data from flask endpoint
d3.json("http://127.0.0.1:5000/api/v1.0/state_airports").then(function(data) {
    
    // call the function to create the # of airports per state
    createAirportsbyStateChart(data)

    });

 
function createAirportsbyStateChart(data) {

    // convert the data returned from the api into a javascript array
    const count_by_state = JSON.parse(data);

    // create the chart
    let trace1 = {
        x: count_by_state.map(row => row.state),
        y: count_by_state.map(row => row.count),
        type: "bar"
    };
    
    // Data trace array
    let visualdata = [trace1];
    
    // Apply features to the chart
    let layout = {
        title: "Number of Airports per State",
        width: 1500,
       
    };
    
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", visualdata, layout);
   
};

d3.json("http://127.0.0.1:5000/api/v1.0/delayed_flights_by_airline").then(function(data) {
    
    // call the function to create the # of delayed flights by airline
    createAirlineDelaysChart(data)
    
   });

   
function createAirlineDelaysChart(data) {

    // convert the data returned from the api into a javascript array
    const airline_delays = JSON.parse(data); 

     // create the chart
    let trace2 = {
        x: airline_delays.map(row => row["Airline Name"]),
        y: airline_delays.map(row => row["Delay Percentage"]),
        type: "bar"
    };
    
    // Data trace array
    let data2 = [trace2];
    
    // Apply features to the chart
    let layout2 = {
        title: "Percentage Delayed Flights in 2023 per Airline",
        width: 1500,
            }

    // Render the plot to the div tag with id "plot"
Plotly.newPlot("plot2", data2, layout2);
};


// navigates to the index.html page 
function myFunction() {
    window.location.href = "index.html"; // Change the URL to the desired destination page
   }


