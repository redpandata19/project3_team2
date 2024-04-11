# Import SQLAlchemy dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS



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
        f"/api/v1.0/flights<br/>"
        f"/api/v1.0/delayed_total_flights_by_airline<br/>"
        )

"""airports"""
# this is for the leaflet map on the homepage
@app.route('/api/v1.0/airports') 
def index():
     
    # create a link from python to airport_db
    session = Session(engine)
    try:
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
    finally:
        session.close()

    return jsonify(airports_data)

"""state_airports"""
# used in creating the chart for number of airports by state
@app.route("/api/v1.0/state_airports")
def state_airports():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    try:
        #gather all airports by state
        state_airports = session.query(airports.state_abbrev, func.count()).group_by(airports.state_abbrev).all()
        # sort states per airport count
        sorted_state_airports = sorted(state_airports, key=lambda x: x[1])
        # extract state abbreviations and airport counts
        states = [result[0] for result in sorted_state_airports]  
        counts = [result[1] for result in sorted_state_airports]
        # convert to dataframe
        state_airports_df = pd.DataFrame({"state":states,
                                        "count":counts})
        state_airports_json = state_airports_df.to_json(orient='records')
    finally: 
        session.close() 
    return jsonify(state_airports_json)

"""delayed_flights_by_airline"""
@app.route("/api/v1.0/delayed_flights_by_airline")
def delayed_flights():
#     # create a link from python to airport_db
    session = Session(engine)
    try:
        total_delay_query = session.query(flights.marketing_airline, flights.depart_15_min_delay, airlines.iata_code, airlines.airline_name)\
            .join(airlines, airlines.iata_code == flights.marketing_airline)\
                .filter(flights.depart_15_min_delay == True)\
                    .all()
        total_query = session.query(flights.marketing_airline, flights.depart_15_min_delay, airlines.iata_code, airlines.airline_name).join(airlines, airlines.iata_code == flights.marketing_airline).all()
        # convert the query into a list of dictionaries
        delayed = [
            {
            "marketing_airline": row.marketing_airline,
            "delay": row.depart_15_min_delay,
            "Airline_code": row.iata_code,
            "Airline_name": row.airline_name        
            }
            
            for row in total_delay_query
        ]
        
        allflights = [
            {
            "marketing_airline": row.marketing_airline,
            "delay": row.depart_15_min_delay,
            "Airline_code": row.iata_code,
            "Airline_name": row.airline_name        
            }
            
            for row in total_query
        ]
        # convert the list of dictionaries into a pandas dataframe (easiest way to manipulate the data)
        delayed_df = pd.DataFrame(delayed)
        total_flights_df = pd.DataFrame(allflights)

        # get the total # of occurrences per airline
        delayed_airline_counts = delayed_df['Airline_name'].value_counts()
        total_airline_counts = total_flights_df['Airline_name'].value_counts()
        #convert to pandas df
        air_delay = pd.DataFrame({'Airline Name': delayed_airline_counts.index, 'Count': delayed_airline_counts.values})
        air_flights = pd.DataFrame({'Airline Name': total_airline_counts.index, 'Count': total_airline_counts.values})
        merged_df = pd.merge(air_delay, air_flights, on='Airline Name', suffixes=('_delayed', '_total'))
        merged_df['Delay Percentage'] = (merged_df['Count_delayed'] / merged_df['Count_total']) * 100
        # convert the dataframe to json    
        counted = merged_df.reset_index().to_json(orient='records')
    finally:
        session.close()
    # what returns from the api call
    return jsonify(counted)










"""delayed_total_flights_by_airline"""
@app.route("/api/v1.0/delayed_total_flights_by_airline")
def delayed_total_flights():
    session = Session(engine)
    try:
        query = session.query(
                    airlines.airline_name,
                    func.count().label('total_flights'),  # Counts all flights per airline
                    func.sum(case((flights.depart_15_min_delay == True, 1), else_=0)).label('total_delays')
                )\
                .join(airlines, airlines.iata_code == flights.marketing_airline)\
                .group_by(airlines.airline_name)\
                .all()

        flights_info = [
            {
                "Airline_name": row.airline_name,
                "Total_flights": row.total_flights,
                "Total_delays": int(row.total_delays)
            }
            for row in query
        ]

    # panda dataframe conversion to fix object for json usage
    # delay_tot_df = pd.DataFrame(flights_info)

    #need to make percentages  
    finally:
        session.close()
    return jsonify(flights_info)

"""flights"""
@app.route("/api/v1.0/flights")
def flights_data():
    # create a link from python to airport_db
    session = Session(engine)
    try:
        flights_query =session.query(flights.marketing_airline, flights.depart_15_min_delay, airlines.iata_code, airlines.airline_name)\
        .join(airlines, airlines.iata_code == flights.marketing_airline).all()
        # Serialize the query results
        flights_data = []
        for flight in flights_query:
            flight_data = {
                'marketing_airline': flight.marketing_airline,
                'destination_airport': flight.destination_airport,
                'origin_airport': flight.origin_airport, 
                'arrival_delay': flight.arrival_delay,
            }
            flights_data.append(flight_data)
    finally:
        session.close()
    return jsonify(flights_data)

if __name__ == '__main__':
    app.run(debug=True)