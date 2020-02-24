const {Pool} = require('pg');
const path = require('path');

const pool = new Pool({
    user: 'donchen',
    host: 'localhost',
    database: 'gallery',
    port: '5432'
});

const filePath1 = path.join(__dirname, 'pgsql_listings.csv');
const insertCSV_Listings = () => {
    pool.query(`COPY listings(id, listing_address, price, numBedrooms, numBathrooms, sqft, saleStatus, agent_id) FROM '${filePath1}' DELIMITER ',' CSV HEADER;`, err => {
      if (err) {
        throw err;
      } else {
        console.log('done');
      }
    });
};

const filePath2 = path.join(__dirname, 'pgsql_photos.csv');
const insertCSV_Photos = () => {
    pool.query(`COPY photos(id, photo_url, listing_id) FROM '${filePath2}' DELIMITER ',' CSV HEADER;`, err => {
      if (err) {
        throw err;
      } else {
        console.log('done');
      }
    });
};

const filePath3 = path.join(__dirname, 'pgsql_users.csv');
const insertCSV_Users = () => {
    pool.query(`COPY users(id) FROM '${filePath3}' DELIMITER ',' CSV HEADER;`, err => {
      if (err) {
        throw err;
      } else {
        console.log('done');
      }
    });
};

const filePath4 = path.join(__dirname, 'pgsql_saved.csv');
const insertCSV_Saved = () => {
    pool.query(`COPY saved(id, listing_id, users_id) FROM '${filePath4}' DELIMITER ',' CSV HEADER;`, err => {
      if (err) {
        throw err;
      } else {
        console.log('done');
      }
    });
};

// insertCSV_Listings();

// insertCSV_Photos();

// insertCSV_Users();

// insertCSV_Saved();