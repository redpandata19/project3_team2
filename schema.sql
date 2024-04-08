-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "size_type" (
    "size_id" int   NOT NULL,
    "relative_size" varchar(6)   NOT NULL
);

CREATE TABLE "states" (
    "state_abbrev" char(2)   NOT NULL,
    "state" varchar(20)   NOT NULL
);

CREATE TABLE "airports" (
    "iata_code" char(3)   NOT NULL,
    "airport_size" int   NOT NULL,
    "airport_name" varchar(70)   NOT NULL,
    "latitude_deg" numeric(10,6)   NOT NULL,
    "longitude_deg" numeric(10,6)   NOT NULL,
    "city" varchar(30)   NOT NULL,
    "state_abbrev" char(2)   NOT NULL
);

CREATE TABLE "flights" (
    "id" serial   NOT NULL,
    "flight_date" date   NOT NULL,
    "marketing_airline" char(2)   NOT NULL,
    "operating_airline" char(2)   NOT NULL,
    "flight_number" varchar(6)   NOT NULL,
    "origin_airport" char(3)   NOT NULL,
    "destination_airport" char(3)   NOT NULL,
    "departure_delay" int   NOT NULL,
    "dep_delay_minutes" int   NOT NULL,
    "depart_15_min_delay" boolean   NOT NULL,
    "arrival_delay" int   NOT NULL,
    "arr_delay_minutes" int   NOT NULL,
    "cancelled" int   NOT NULL,
    "diverted" int   NOT NULL,
    "carrier_delay" int   NOT NULL,
    "weather_delay" int   NOT NULL,
    "nas_delay" int   NOT NULL,
    "security_delay" int   NOT NULL,
    "late_aircraft_delay" int   NOT NULL
);

CREATE TABLE "airlines" (
    "iata_code" char(2)   NOT NULL,
    "airline_name" varchar(30)   NOT NULL,
    "type" varchar(15)   NOT NULL
);

ALTER TABLE "airports" ADD CONSTRAINT "fk_airports_airport_size" FOREIGN KEY("airport_size")
REFERENCES "size_type" ("size_id");

ALTER TABLE "airports" ADD CONSTRAINT "fk_airports_state_abbrev" FOREIGN KEY("state_abbrev")
REFERENCES "states" ("state_abbrev");

ALTER TABLE "flights" ADD CONSTRAINT "fk_flights_marketing_airline" FOREIGN KEY("marketing_airline")
REFERENCES "airlines" ("iata_code");

ALTER TABLE "flights" ADD CONSTRAINT "fk_flights_operating_airline" FOREIGN KEY("operating_airline")
REFERENCES "airlines" ("iata_code");

ALTER TABLE "flights" ADD CONSTRAINT "fk_flights_origin_airport" FOREIGN KEY("origin_airport")
REFERENCES "airports" ("iata_code");

ALTER TABLE "flights" ADD CONSTRAINT "fk_flights_destination_airport" FOREIGN KEY("destination_airport")
REFERENCES "airports" ("iata_code");

