-- DROP DATABASE gallery;
-- CREATE DATABASE gallery;

\connect gallery;

DROP TABLE listings, photos, users, saved;

CREATE TABLE users (
    id serial PRIMARY KEY
);

CREATE TABLE listings (
    id serial PRIMARY KEY,
    listing_address text NOT NULL,
    price int NOT NULL,
    numBedrooms int NOT NULL,
    numBathrooms int NOT NULL,
    sqft int NOT NULL, 
    saleStatus text NOT NULL,
    agent_id int REFERENCES users(id)
);

CREATE TABLE photos (
    id serial PRIMARY KEY,
    photo_url text NOT NULL,
    listing_id int REFERENCES listings(id)
);

CREATE TABLE saved (
    id serial PRIMARY KEY,
    listing_id int REFERENCES listings(id),
    users_id int REFERENCES users(id)
);
