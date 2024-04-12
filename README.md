#  $\color{lightskyblue}{\textsf{US AIR TRAVEL FOR THE FUN OF IT}}$

### Description
Our project looks at airports in the US and airline flight arrival information collected by the US Department of Transportation. Our website is helpful to prospective travelers who are intimidated by all the information overload on sites like Expedia or Kayak. As a seasoned traveler you get to know the airport locations, IATA codes as well as airline carriers, but to a novice this can all be very confusing. Reviewing the main map helps users understand if there are any airports in their area and look at where they can easily get to in the US. Using our airline carrier statistics, users can determine which airline carrier is going to be their new favorite!
When selecting data for this website we were careful to utilize reputable data sources and the most current data available. When presenting the data, we made sure to consider how selecting our data could impact the story told by the visualizations and tried to present the most objective views. While it was interesting to look at the airline carriers with the most delayed flights, that does not necessarily reflect the reliability of the airline. Rather, we chose to present the percentages of delays for each airline to account for the size of each airline.

# Installation and Setup Guide

Follow these steps to set up and run the project:

## Step 1: Clone the Repository
Clone the entire repository to your local machine.

## Step 2: Set Up the Database with SQL
### Files to Load:
- Navigate to: `\Database\Resources\db_sources`
- Files include:
  - `Airlines.csv`
  - `Airport_sizes.csv`
  - `Airports.csv`
  - `Flights.zip`
  - `States.csv`

### Database Setup:
1. Open pgAdmin.
2. Create a new database named `airport_db`.
3. Run the SQL script located at `Database/Schema.sql`.

### Importing CSV Files:
Import the CSV files in the following order from `Resources/db_sources` (note: all CSVs have headers):
- `states.csv` into the `states` table.
- `airport_sizes.csv` into the `airport_sizes` table.
- `airports.csv` into the `airports` table.
- `airlines.csv` into the `airlines` table.

### Handling Flight Data:
1. Unzip `flights.zip`.
2. For importing `flights.csv`, adjust the import options:
   - Go to the columns table, click the "x" on the `id` column to ensure it does not look for an `id` field and instead loads one automatically.

## Step 3: Ensure Dependencies
Check the list of dependencies and install any new libraries or tools needed for your environment.

## Step 4: Run the Flask App
1. Run the Flask app by executing `python app.py`.
2. To view data:
   - Click the link to open API endpoints.
   - Copy and paste the endpoints to retrieve data in JSON format.

## Step 5: Open the Webpage
1. Open `index.html` in your browser to explore the site.
2. Click the big blue airplane at the top to navigate through pages.
3. Be patient; some graphs may take a minute to load or update.
4. On the Stats page, use the drop-down menu in the top left corner to change the airline carrier and explore its statistics.

## File Structure
Airport_Site <br>
app.py <br>
index.html <br>
info.html <br>
static <br>
&nbsp; &nbsp; - `css` <br>
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - style.css <br>
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - style2.css <br>
             &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - userStyle.css <br>
&nbsp; &nbsp; - `js` <br>
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - script.js <br>
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - scriptinfo.js <br>
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - cube.js <br>
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - userScript.js <br>
&nbsp;&nbsp; - `Images` <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - airplane.png <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - airport-16.ico <br>

Database <br>
&nbsp;&nbsp; - Schema.sql <br>
&nbsp;&nbsp; - Sources_Data_Cleanup_for_database.ipynb <br>
&nbsp;&nbsp; - `images` <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - ERD_flight_data.png <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- pgadmin_erd.pgerd <br>
&nbsp;&nbsp; - `Resources` <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - us-airports.csv <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - BTS <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - BTS_Q1_2023.zip <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - BTS_Q2_2023.zip <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - BTS_Q3_2023.zip <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - BTS_Q4_2023.zip <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - db_sources <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - airlines.csv <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - airport_sizes.csv <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - airports.csv <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - flights.zip <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - states.csv <br>    
            
        



## Dependencies
`Python 3.x`, `Pandas`, `SQLAlchemy`, `Flask`, `pgAdmin4`, `CORS`

## Tools Used
JupyterNotebook https://jupyter.org/<br>
QuickDBD https://www.quickdatabasediagrams.com/<br>
Three.js (Image cube) https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene<br>
Leaflet.js (maps) https://leafletjs.com/reference.html#map-example<br>
Psycopg2 https://www.psycopg.org/docs/<br>
Pathlib https://docs.python.org/3/library/pathlib.html<br>
D3.js https://devdocs.io/d3~7/<br>

## Creators
* redpandata19 (Elaine McCall)<br>
* Latashajd40 (Latasha J)<br>
* rachelnteran (Rachel Teran)<br>
* HardmanT (Tammy Hardman)<br>
## Sources
=======
US Airports: https://www.oag.com/flight-data-sets <br>
Images: https://pixabay.com/images/search/airplane/ <br>
Flight Data: https://www.transtats.bts.gov/DL_SelectFields.aspx?gnoyr_VQ=FGJ&QO_fu146_anzr=b0-gvzr

