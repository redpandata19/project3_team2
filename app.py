# import dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
import numpy as np
import pandas as pd
import json
from flask import Flask, jsonify

# must import CORS to avoid cross origin error
from flask_cors import CORS

################################################
# Database Setup
################################################

# connect to postgres need: username, password, host, and port
engine = create_engine("postgresql://postgres:postgres@localhost:5432/airport_db")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)

# create references to each table in the database
airports = Base.classes.airports
states = Base.classes.states
airlines = Base.classes.airlines
airport_sizes = Base.classes.airport_sizes
flights = Base.classes.flights

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

# needed to avoid cross origin error
CORS(app)
#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/airports<br/>"
        f"/api/v1.0/state_airports<br/>"
        f"/api/v1.0/delayed_flights_by_airline<br/>"
        f"/api/v1.0/airline/<airline1>"
        )

# this is for the leaflet map on the homepage
@app.route('/api/v1.0/airports') 
def index():
     
    # create a link from python to airport_db
    session = Session(engine)
   
    # Query all passengers
    results = session.query(airports.iata_code, airports.airport_size, airports.airport_name, \
        airports.latitude_deg, airports.longitude_deg).filter(airports.airport_size==3).all()
    
    # Convert the SQLAlchemy Row objects into dictionaries
    airports_data = [
        {
            "iata_code": row.iata_code,
            "airport_size": row.airport_size,
            "airport_name": row.airport_name,
            "latitude_deg": row.latitude_deg,
            "longitude_deg": row.longitude_deg
        }
        for row in results
    ]

    session.close()

    return jsonify(airports_data)

# used in creating the chart for number of airports by state
@app.route("/api/v1.0/state_airports")
def state_airports():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Gather all airports by state"""
    state_airports = session.query(airports.state_abbrev, func.count()).group_by(airports.state_abbrev).all()
    session.close()
    
    # sort states per airport count
    sorted_state_airports = sorted(state_airports, key=lambda x: x[1])
    # extract state abbreviations and airport counts
    states = [result[0] for result in sorted_state_airports]  
    counts = [result[1] for result in sorted_state_airports]
    # convert to dataframe
    state_airports_df = pd.DataFrame({"state":states,
                                    "count":counts})
    state_airports_json = state_airports_df.to_json(orient='records')
 
    return jsonify(state_airports_json)

@app.route('/api/v1.0/airline/<airline1>')
def flights_by_airline(airline1):
    
         # create a link from python to airport_db
    session = Session(engine)
    
     # Query flights and join with airlines
    query = session.query(flights.marketing_airline, flights.depart_15_min_delay, flights.cancelled, flights.dep_delay_minutes, airlines.iata_code, airlines.airline_name)\
        .join(airlines, airlines.iata_code == flights.marketing_airline)\
        .filter(airlines.airline_name == airline1)\
        .all()

    delayed = [
        {
        "marketing_airline": row.marketing_airline,
        "delay": row.depart_15_min_delay,
        "flights_cancelled": row.cancelled,
        "depart_minutes": row.dep_delay_minutes,
        "Airline_name": row.airline_name        
        }
        
        for row in query
    ]
    
    session.close()
    
    # what returns from the api call
    return jsonify(delayed)

@app.route("/api/v1.0/delayed_flights_by_airline")
def delayed_flights():
    session = Session(engine)
    try:
        # Using a single query to get all required data
        query = session.query(
            airlines.airline_name,
            func.count().label('total_flights'),
            func.sum(flights.depart_15_min_delay == True).label('delayed_flights')
        ).join(
            flights, airlines.iata_code == flights.marketing_airline
        ).group_by(
            airlines.airline_name
        ).all()

        # Construct the response data as a list of dictionaries
        results = [
            {
                "Airline Name": row.airline_name,
                "Total Flights": row.total_flights,
                "Delayed Flights": row.delayed_flights,
                "Delay Percentage": (row.delayed_flights / row.total_flights) * 100
            }
            for row in query
        ]

        # Using jsonify to return a JSON array
        response = jsonify(results)
    finally:
        session.close()

    return response
    
if __name__ == '__main__':
    app.run(debug=True)