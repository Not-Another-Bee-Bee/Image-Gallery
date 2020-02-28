const {Pool} = require('pg');

const pool = new Pool({
    user: 'donchen',
    host: 'localhost',
    database: 'gallery',
    port: '5432'
});

module.exports = {
    listings: {
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
            // INSERT INTO listings (listing_address, price, numBedrooms, numBathrooms, sqft, saleStatus, agent_id)
                // VALUES ('123 4th Ave', SF, CA 94112', 2, 3, 4, 5, 'Sold', 5000);
            pool.query(`INSERT INTO listings (listing_address, price, numBedrooms, numBathrooms, sqft, saleStatus, agent_id) 
                VALUES ('${listing_address}',${price},${numBedrooms},${numBathrooms},${sqft},'${saleStatus}',${agent_id});`, (error) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null);
                }
            });
        },
        updateListing: (id, data, callback) => {
            const { listing_address, price, numBedrooms, numBathrooms, sqft, saleStatus, agent_id } = data;
            // UPDATE listings SET listing_address = '471 7th Ave', price = 1800000, numBedrooms = 5, numBathrooms = 4, 
                // sqft = 9500, saleStatus = 'Pending', agent_id = 5000 WHERE id = 1;
            pool.query(
                `UPDATE listings SET listing_address='${listing_address}', price=${price}, numBedrooms=${numBedrooms},
                numBathrooms=${numBathrooms}, sqft=${sqft}, saleStatus='${saleStatus}', agent_id=${agent_id} WHERE id=${id};`, (error) => {
                if (error) {
                    callback(error);
                } else  {
                    callback(null);
                }
            });
        },
        deleteListing: (id, callback) => {
            // DELETE FROM listings WHERE id = 1000000;
            pool.query(`DELETE FROM listings WHERE id = ${id}`, (error) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null);
                }
            });
        }
    },
    photos: {
        addPhoto: (data, callback) => {
            const { photo_url, listing_id } = data;
            // INSERT INTO photos (photo_url, listing_id) 
            // VALUES ('https://airbnb-recommendation-photos.s3-us-west-1.amazonaws.com/photo1', 10000001);
            pool.query(`INSERT INTO photos (photo_url, listing_id) VALUES ('${photo_url}', ${listing_id});`, (error) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null);
                }
            });
        },
        updatePhoto: (id, data, callback) => {
            const { photo_url, listing_id } = data;
            // UPDATE photos SET photo_url = 'https://airbnb-recommendation-photos.s3-us-west-1.amazonaws.com/photo1', 
                // listing_id = 1 where photo_id = 50000001;
            pool.query(
                `UPDATE photos SET photo_url='${photo_url}', listing_id=${listing_id} WHERE id=${id};`, (error) => {
                if (error) {
                    callback(error);
                } else  {
                    callback(null);
                }
            });
        },
        deletePhoto: (id, callback) => {
            // DELETE FROM photos WHERE id = 50000001;
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


// ERROR:  duplicate key value violates unique constraint "photos_pkey"
// DETAIL:  Key (id)=(1) already exists.

// create sequence listingsSequence start with 10000007 owned by listings.id;
// alter table listings alter column id set default nextval('listingsSequence');

// create sequence photosSequence start with 50000001 owned by photos.id;
// alter table photos alter column id set default nextval('photosSequence');