# Import SQLAlchemy dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect

# Create the connection engine
engine = create_engine("postgresql://username:password@localhost:5432/airport_db")

# Create the inspector and connect it to the engine
inspector = inspect(engine)

# Collect the names of tables within the database
tables = inspector.get_table_names()

# Print the names of tables within the database
print("Tables in the database:", tables)

# Using the inspector to print the column names within the 'dow' table and its types
columns = inspector.get_columns('dow')
print("Columns in the 'dow' table:")
for column in columns:
    print(column["name"], column["type"])
# Import dependencies
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

from flask_cors import CORS




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
CORS(app)
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
    # convert to dataframe
    state_airports_df = pd.DataFrame({"state":states,
                                    "count":counts})
    state_airports_json = state_airports_df.to_json(orient='records')
 
    return jsonify(state_airports_json)

if __name__ == "__main__":
    app.run()