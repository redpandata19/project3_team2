# Import dependencies
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

import matplotlib.pyplot as plt

import psycopg2




#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:postgres@localhost:5432/airport_db")

# base mapping
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)
# Table references
airports = Base.classes.airports
states = Base.classes.states
airlines = Base.classes.airlines
airport_sizes = Base.classes.airport_sizes
flights = Base.classes.flights

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/state_airports"
    )


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

 # Create a horizontal bar chart
plt.figure(figsize=(10, 8))  
plt.barh(states, counts, color='green') 

# create the bar chart and label the axis and title
plt.xlabel('Number of Airports') 
plt.ylabel('State') 
plt.title('Number of Airports by State') 
plt.tight_layout() 
# Export chart image
plt.savefig('images/airports_by_state.png', dpi=300)  
# Display the chart
plt.show()



