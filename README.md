# US AIR TRAVEL FOR THE FUN OF IT

### Description
Our project looks at airports in the US and airline flight arrival information collected by the US Department of Transportation. Our website is helpful to prospective travelers who are intimidated by all the information overload on sites like Expedia or Kayak. As a seasoned traveler you get to know the airport locations, IATA codes as well as airline carriers, but to a novice this can all be very confusing. Reviewing the main map helps users understand if there are any airports in their area and look at where they can easily get to in the US. Using our airline carrier statistics, users can determine which airline carrier is going to be their new favorite!
When selecting data for this website we were careful to utilize reputable data sources and the most current data available. When presenting the data, we made sure to consider how selecting our data could impact the story told by the visualizations and tried to present the most objective views. While it was interesting to look at the airline carriers with the most delayed flights, that does not necessarily reflect the reliability of the airline. Rather, we chose to present the percentages of delays for each airline to account for the size of each airline.

## File Structure
Airport_Site 
    app.py 
    index.html 
    info.html 
    static 
        css 
            style.css 
            style2.css 
        data 
            large_airport_data.json 
        images 
            airplane.png 
            airport-16.ico 
             
        js 
            script.js 
            scriptinfo.js 
app.py 
Cube_and_banners 
    js 
        arrow_banners.js 
        cube.js 
        images 
            plane-4245416_1280.jpg 
            plane-513641_1280.jpg 
            airplane-6867678_1280.jpg 
            airplane-1807486_1280.jpg 
            ai-generated-8635794_1280.jpg 
            ai-generated-8131428_1280.png
Database 
    images 
        ERD_flight_data.png 
        pgadmin_erd.pgerd 
        successful_upload_of_other_4_tables.png 
        successful_upload_to_flights_table.png 
    Resources 
        BTS 
            BTS_Q1_2023.zip 
            BTS_Q2_2023.zip 
            BTS_Q3_2023.zip 
            BTS_Q4_2023.zip 
        db_sources 
            airlines.csv 
            airport_sizes.csv 
            airports.csv 
            flights.zip 
            states.csv 
        us-airports.csv 
    Schema.sql 
    Sources_Data_Cleanup_for_database.ipynb 
Images 
    airplane.png 
    airport-16.ico 
    
index.html 
info.html 
js_visualizations 
    app.py 
    Connect_to_database-RTcopy.ipynb 
    datap3.js 
    demop3.js 
    indexp3.html 
    plotp3.js 
README.md 
sql_query_visuals_branch 
    app.py 
    images 
        airports_by_state.png
    index.html 
    large_airport_data.json 
    sorted_state_aiports.json 
    sql_query_visuals.ipynb 
    static 
        css 
            style.css 
            style2.css 
        js 
            script.js 
            scriptInfo.js 
static 
    css 
        style.css 
        style2.css 
        style3.css 
        style4.css 
    data 
        large_aiport_data.json 
    Images 
        airplane.png 
        airport-16.ico 
        purplesky.webp 
    js 
        banners_for_airports.js 
        cube.js 
        cube.js_old 
        load_sequence 
        script.js 
        scriptInfo.js 
threejs_airportboxes 
    static 
        js 
            cube.js 
            images 
                plane-4245416_1280.jpg 
                plane-513641_1280.jpg 
                airplane-6867678_1280.jpg 
                airplane-1807486_1280.jpg 
                ai-generated-8635794_1280.jpg 
                ai-generated-8131428_1280.png

## Tools Used
pgAdmin4 (DataBase) https://www.pgadmin.org/docs/<br>
JupyterNotebook https://jupyter.org/<br>
QuickDBD https://www.quickdatabasediagrams.com/<br>
Flask https://flask.palletsprojects.com/en/3.0.x/<br>
## Dependencies
Python 3.x https://docs.python.org/3/<br>
Three.js (Image cube) https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene<br>
Pandas https://pandas.pydata.org/docs/reference/general_functions.html<br>
Leaflet.js (maps) https://leafletjs.com/reference.html#map-example<br>
SQLAlchemy https://docs.sqlalchemy.org/en/20/<br>
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
# project3_team2
