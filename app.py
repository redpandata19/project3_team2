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
