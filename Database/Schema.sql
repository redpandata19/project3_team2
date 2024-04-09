-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE airport_sizes (
    size_id int   NOT NULL,
    relative_size VARCHAR(6)   NOT NULL,
    CONSTRAINT pk_size_type PRIMARY KEY (
        size_id
     )
);

CREATE TABLE states (
    state_abbrev CHAR(2)   NOT NULL,
    state VARCHAR(20)   NOT NULL,
    CONSTRAINT pk_states PRIMARY KEY (
        state_abbrev
     )
);

CREATE TABLE airports (
    iata_code CHAR(3)   NOT NULL,
    airport_size INT   NOT NULL,
    airport_name VARCHAR(70)   NOT NULL,
    latitude_deg NUMERIC(10,6)   NOT NULL,
    longitude_deg NUMERIC(10,6)   NOT NULL,
    city VARCHAR(30)   NOT NULL,
    state_abbrev CHAR(2)   NOT NULL,
    CONSTRAINT pk_airports PRIMARY KEY (
        iata_code
     )
);

CREATE TABLE airlines (
    iata_code CHAR(2)   NOT NULL,
    airline_name VARCHAR(30)   NOT NULL,
    type VARCHAR(15)   NOT NULL,
    CONSTRAINT pk_airlines PRIMARY KEY (
        iata_code
     )
);

CREATE TABLE flights (
    id Serial   NOT NULL,
    flight_date DATE   NOT NULL,
    marketing_airline CHAR(2)   NOT NULL,
    operating_airline CHAR(2)   NOT NULL,
    flight_number VARCHAR(6)   NOT NULL,
    origin_airport CHAR(3)   NOT NULL,
    destination_airport CHAR(3)   NOT NULL,
    departure_delay INT   NULL,
    dep_delay_minutes INT   NULL,
    depart_15_min_delay BOOLEAN   NULL,
    arrival_delay INT   NULL,
    arr_delay_minutes INT   NULL,
    cancelled INT   NULL,
    diverted INT   NULL,
    carrier_delay INT   NULL,
    weather_delay INT   NULL,
    nas_delay INT   NULL,
    security_delay INT   NULL,
    late_aircraft_delay INT   NULL,
    CONSTRAINT pk_flights PRIMARY KEY (
        id
     )
);

ALTER TABLE airports ADD CONSTRAINT fk_airports_airport_size FOREIGN KEY(airport_size)
REFERENCES size_type (size_id);

ALTER TABLE airports ADD CONSTRAINT fk_airports_state_abbrev FOREIGN KEY(state_abbrev)
REFERENCES states (state_abbrev);

ALTER TABLE flights ADD CONSTRAINT fk_flights_marketing_airline FOREIGN KEY(marketing_airline)
REFERENCES airlines (iata_code);

ALTER TABLE flights ADD CONSTRAINT fk_flights_operating_airline FOREIGN KEY(operating_airline)
REFERENCES airlines (iata_code);

ALTER TABLE flights ADD CONSTRAINT fk_flights_origin_airport FOREIGN KEY(origin_airport)
REFERENCES airports (iata_code);

ALTER TABLE flights ADD CONSTRAINT fk_flights_destination_airport FOREIGN KEY(destination_airport)
REFERENCES airports (iata_code);

