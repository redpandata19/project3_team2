// Get the Roadster endpoint
const airport_per_state = "https://localhost:5000/api/v1.0/state_airports";

// Fetch the JSON data and console log it
d3.json(airport_per_state).then(function(data) {
  console.log(data);
  let appsdata = data
  return appsdata
});
let datap3 = appsdata
// Get the capsules endpoint
const delay_per_airline = "https://api.spacexdata.com/v4/capsules";

// Fetch the JSON data and console log it
d3.json(delay_per_airline).then(function(data) {
  console.log(data);
  let flightsd = data
  return flightsd
});

let flightsdata = flightsd