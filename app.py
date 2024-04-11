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
        f"/api/v1.0/state_airports"
        f"/api/v1.0/delayed_flights_by_airline"
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

@app.route("/api/v1.0/delayed_flights_by_airline")
def delayed_flights():
    
    # create a link from python to airport_db
    session = Session(engine)
    query = session.query(flights.marketing_airline, flights.depart_15_min_delay, airlines.iata_code, airlines.airline_name)\
        .join(airlines, airlines.iata_code == flights.marketing_airline)\
            .filter(flights.depart_15_min_delay == True)\
                .all()
                
    # convert the query into a list of dictionaries
    delayed = [
        {
        "marketing_airline": row.marketing_airline,
        "delay": row.depart_15_min_delay,
        "Airline_code": row.iata_code,
        "Airline_name": row.airline_name        
        }
        
        for row in query
    ]
    
    # convert the list of dictionaries into a pandas dataframe (easiest way to manipulate the data)
    delayed_df = pd.DataFrame(delayed)

    # get the total # of occurrences per airline
    airline_counts = delayed_df['Airline_name'].value_counts()
    
    # convert the dataframe to json    
    counted = airline_counts.reset_index().to_json(orient='records')
    
    session.close()
    
    # what returns from the api call
    return jsonify(counted)

    
if __name__ == '__main__':
    app.run(debug=True)