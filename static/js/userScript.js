
function getAirlineStats(data) {
  

   let total_flights = data.length
   let delay_minutes = avg_delay_minutes(data);
    
    createPie1(data, total_flights, delay_minutes);
    createPie2(data,total_flights);
}

function createPie1(data, total_flights, delay_minutes) {

    // used in the pie chart
    let cancelled_flights = countCancelledFlights(data);
    let non_cancelled = total_flights - cancelled_flights
    
     // Define data for the Pie chart
     var data1 = [{
        values: [cancelled_flights, non_cancelled], // Values for each segment of the Pie chart
        labels: ['Cancelled', 'Completed'], // Labels for each segment
        type: 'pie' // Specify the type of chart
    }];

    // Define layout options for the Pie chart
    var layout = {
        title: 'Cancelled Flights vs Completed Flights' // Title for the chart
    };

    // Render the Pie chart
    Plotly.newPlot('plot', data1, layout);

    // changes the html text
    var paragraph = document.getElementById("delayMinutes");

    // Change the text using textContent property
    paragraph.textContent = delay_minutes.toFixed(2) + " minutes";

}

function createPie2(data, total_flights) {


    let delay = get_departure_delay(data);
    let non_delayed = total_flights - delay

     // Define data for the Pie chart
     var data1 = [{
        values: [delay, non_delayed], // Values for each segment of the Pie chart
        labels: ['Delayed', 'On-time'], // Labels for each segment
        type: 'pie' // Specify the type of chart
    }];

    // Define layout options for the Pie chart
    var layout = {
        title: 'Delayed vs On-time Flights' // Title for the chart
    };

    // Render the Pie chart
    Plotly.newPlot('plot2', data1, layout);


}

function countCancelledFlights(data) {

    let cancelledCount = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].flights_cancelled === 1) {
            cancelledCount++;
        }
    }
    return cancelledCount;

}

function get_departure_delay(data) {

    let delay = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].delay === true) {
            delay++;
        }
    }
    return delay;
}

function avg_delay_minutes(data) {

    let total_delay = 0;
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        total_delay += data[i].depart_minutes;
        count +=1
        }

    
    return total_delay/count;
}

var dropdown = document.getElementById("dropdown");

// Add event listener for the 'change' event
dropdown.addEventListener("change", function() {
    // Get the selected value from the dropdown
    var selectedValue = dropdown.value;

    d3.json("http://127.0.0.1:5000/api/v1.0/airline/" + selectedValue).then(function (data) {
        
        getAirlineStats(data);

    });
 
});



