#  $\color{lightskyblue}{\textsf{US AIR TRAVEL FOR THE FUN OF IT}}$

### Description
Our project looks at airports in the US and airline flight arrival information collected by the US Department of Transportation. Our website is helpful to prospective travelers who are intimidated by all the information overload on sites like Expedia or Kayak. As a seasoned traveler you get to know the airport locations, IATA codes as well as airline carriers, but to a novice this can all be very confusing. Reviewing the main map helps users understand if there are any airports in their area and look at where they can easily get to in the US. Using our airline carrier statistics, users can determine which airline carrier is going to be their new favorite!
When selecting data for this website we were careful to utilize reputable data sources and the most current data available. When presenting the data, we made sure to consider how selecting our data could impact the story told by the visualizations and tried to present the most objective views. While it was interesting to look at the airline carriers with the most delayed flights, that does not necessarily reflect the reliability of the airline. Rather, we chose to present the percentages of delays for each airline to account for the size of each airline.

## Instructions for use!
Step 1: Clone the entire repository <br>
Step 2: SQL <br>
Files to load: <br>
\Database\Resources\db_sources <br>
Airlines.csv <br>
Airport_sizes.csv <br>
Airports.csv <br>
Flights.zip <br>
States.csv <br>
Open pgAdmin <br>
Create a DB in pgAdmin called 'airport_db' <br>
Run file: Database/Schema.sql <br>
Import CSVs in order from Resources/db_sources (All CSV's have headers): <br>
states.csv -> states table <br>
airport_sizes.csv -> airport_sizes table <br>
aiports.csv -> airports table <br>
airlines.csv -> airlines table <br>
flight data has a serial PK, it takes an extra couple steps: <br>
unzip flights.zip <br>
import options for flights.csv: go to the columns table, click the "x" on id (so it does not look for an id field and loads one  automatically) <br>
Step 3: Ensure dependencies <br>
Check through the list of dependencies and install any new libraries or tools into your environment. <br>
Step 4: Run the Flask app <br>
Run the Flask app by calling python app.py <br>
**if you want to look at the data* <br>
Click the link to open our API endpoints <br>
Copy and past the endpoints to get the data as a JSON <br>
Step 5: Open the webpage <br>
Open index.html <br>
Explore the site! <br>
Click the big blue airplane at the top to navigate pages <br>
Be sure to be patient, some of the graphs take a minute to load or update <br>
On the Stats page use the drop down menu in the top left corner to change the airline carrier and explore its statistics <br>

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
            
        
        images <br>
            plane-4245416_1280.jpg <br>
            plane-513641_1280.jpg <br>
            airplane-6867678_1280.jpg <br>
            airplane-1807486_1280.jpg <br>
            ai-generated-8635794_1280.jpg <br>
            ai-generated-8131428_1280.png<br>
Database <br>
&nbsp;&nbsp; - Schema.sql <br>
&nbsp;&nbsp; - Sources_Data_Cleanup_for_database.ipynb <br>
&nbsp;&nbsp; - `images` <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - ERD_flight_data.png <br>
&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- pgadmin_erd.pgerd <br>
&nbsp;&nbsp; - `Resources` <br>
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

&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - us-airports.csv <br>


            
            
        

Images <br>
    airplane.png <br>
    airport-16.ico <br>
    
index.html <br>
info.html <br>
js_visualizations <br>
    app.py <br>
    Connect_to_database-RTcopy.ipynb <br>
    datap3.js <br>
    demop3.js <br>
    indexp3.html <br>
    plotp3.js <br>
README.md <br>
sql_query_visuals_branch <br>
    app.py <br>
    images <br>
        airports_by_state.png<br>
    index.html <br>
    large_airport_data.json <br>
    sorted_state_aiports.json <br>
    sql_query_visuals.ipynb <br>
    static <br>
        css <br>
            style.css <br>
            style2.css <br>
        js <br>
            script.js <br>
            scriptInfo.js <br>
static <br>
    css <br>
        style.css <br>
        style2.css <br>
        style3.css <br>
        style4.css <br>
    data <br>
        large_aiport_data.json <br>
    Images <br>
        airplane.png <br>
        airport-16.ico <br>
        purplesky.webp <br>
    js <br>
        banners_for_airports.js <br>
        cube.js <br>
        cube.js_old <br>
        load_sequence <br>
        script.js <br>
        scriptInfo.js <br>

## Dependencies
Python 3.x https://docs.python.org/3/<br>
Pandas https://pandas.pydata.org/docs/reference/general_functions.html<br>
SQLAlchemy https://docs.sqlalchemy.org/en/20/<br>
Flask https://flask.palletsprojects.com/en/3.0.x/<br>
pgAdmin4 (DataBase) https://www.pgadmin.org/docs/<br>
CORS https://flask-cors.readthedocs.io/en/latest/<br>

## Tools Used
JupyterNotebook https://jupyter.org/<br>
QuickDBD https://www.quickdatabasediagrams.com/<br>
Three.js (Image cube) https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene<br>
Leaflet.js (maps) https://leafletjs.com/reference.html#map-example<br>
Psycopg2 https://www.psycopg.org/docs/<br>
Pathlib https://docs.python.org/3/library/pathlib.html<br>
D3.js https://devdocs.io/d3~7/<br>

## Creators
redpandata19 (Elaine McCall)<br>
Latashajd40 (Latasha J)<br>
rachelnteran (Rachel Teran)<br>
HardmanT (Tammy Hardman)<br>
## Sources
=======
US Airports: https://www.oag.com/flight-data-sets <br>
Images: https://pixabay.com/images/search/airplane/ <br>
Flight Data: https://www.transtats.bts.gov/DL_SelectFields.aspx?gnoyr_VQ=FGJ&QO_fu146_anzr=b0-gvzr

