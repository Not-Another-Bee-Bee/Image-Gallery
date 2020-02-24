const {Pool} = require('pg');

const pool = new Pool({
    user: 'donchen',
    host: 'localhost',
    database: 'gallery',
    port: '5432'
});

// functions for the queries in db

module.exports = {
    gallery: {
        getListing: (id, callback) => {
            pool.query(`SELECT * FROM listings INNER JOIN photos ON listings.id = photos.listing_id WHERE listings.id = ${id};`, (error, results) => {
              if (error) {
                callback(error);
              } else {
                callback(null, results);
              }
            });
        },
        addListing: (data, callback) => {
            const { listing_address, price, numBedrooms, numBathrooms, sqft, saleStatus, agent_id } = data;
            pool.query(`INSERT INTO listings (id, listing_address, price, numBedrooms, numBathrooms, sqft, saleStatus, agent_id) 
                VALUES (${listing_address}, ${price}, ${numBedrooms}, ${numBathrooms}, ${sqft}, ${saleStatus}, ${agent_id});`, (error) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, results);
                }
            });
        },
        addPhoto: (data, callback) => {
            const { photo_url, listing_id } = data;
            pool.query(`INSERT INTO photos (photo_url, listing_id) VALUES (${photo_url}, ${listing_id});`, (error) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, results);
                }
            });
        },
        updateListing: (id, data, callback) => {
            const { listing_address, price, numBedrooms, numBathrooms, sqft, saleStatus, agent_id } = data;
            pool.query(
              `UPDATE listings SET listing_address=${listing_address}, price=${price}, numBedrooms=${numBedrooms},
                numBathrooms=${numBathrooms}, sqft=${sqft}, saleStatus=${saleStatus}, agent_id=${agent_id} WHERE id=${id};`, (error) => {
                if (error) {
                    callback(error);
                } else  {
                    callback(null, results);
                }
            });
        },
        updatePhoto: (id, data, callback) => {
            const { photo_url } = data;
            pool.query(
              `UPDATE photo SET photo_url=${photo_url} WHERE id=${id};`, (error) => {
                if (error) {
                    callback(error);
                } else  {
                    callback(null);
                }
            });
        },
        deleteListing: (id, callback) => {
            pool.query(`DELETE FROM listings WHERE id = ${id}`, (error) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null);
                }
            });
        },
        deletePhoto: (id, callback) => {
            pool.query(`DELETE FROM photos WHERE id = ${id}`, (error) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null);
                }
            });
        }        
    }
}