DROP DATABASE IF EXISTS image_gallery
CREATE DATABASE image_gallery;

CREATE TABLE listing (
    id SERIAL PRIMARY KEY,
    agent_id INTEGER NOT NULL,
    listing_address VARCHAR(250) NOT NULL,
    price MONEY NOT NULL,
    numBedrooms INTEGER NOT NULL,
    numBathrooms INTEGER NOT NULL,
    sqft INTEGER NOT NULL, 
    saleStatus VARCHAR(250) NOT NULL,
    FOREIGN KEY (agent_id) REFERENCES users(id)
)

CREATE TABLE photo (
    id SERIAL PRIMARY KEY,
    photo_url VARCHAR(250) NOT NULL,
    listing_id INTEGER NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES listings(id)
)

CREATE TABLE user (
    id SERIAL PRIMARY KEY
)

CREATE TABLE saved (
    saved BOOLEAN NOT NULL,
    listing_id INTEGER NOT NULL,
    users_id INTEGER NOT NULL,
    FOREIGN KEY listing_id REFERENCES listings(id),
    FOREIGN KEY users_id REFERENCES users(id)
)

-- CREATE TABLE isAgent (
--     isAgent BOOLEAN,
--     users_id INTEGER NOT NULL,
--     listing_id INTEGER NOT NULL,
--     FOREIGN KEY users_id REFERENCES users(id),
--     FOREIGN KEY listing_id REFERENCES listings(id)
-- )
