console.log(datap3);

// Create a custom function to return Roman gods with more than 1 million search results
// function popular(roman) {
//   return roman.romanSearchResults > 1000000;
// }

// // Call the custom function with filter()
// let popularRomans = searchResults.filter(popular);

// Trace for the d
let trace1 = {
    x: datap3.map(row => row.State),
    y: datap3.map(row => row.Count),
    type: "bar"
};

// Data trace array
let data = [trace1];

// Apply a title to the layout
let layout = {
  title: "Number of Airports per State"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);

console.log(flightsdata);

// Create a custom function to return Roman gods with more than 1 million search results
// function popular(roman) {
//   return roman.romanSearchResults > 1000000;
// }

// // Call the custom function with filter()
// let popularRomans = searchResults.filter(popular);

// Trace for the d
let trace2 = {
    x: flightsdata.map(row => row["Airline Name"]),
    y: flightsdata.map(row => row.num_delayed_flights),
    type: "bar"
};

// Data trace array
let data2 = [trace2];

// Apply a title to the layout
let layout2 = {
  title: "Number of Delayed Flights in 2023 per Airline"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot2", data2, layout2);