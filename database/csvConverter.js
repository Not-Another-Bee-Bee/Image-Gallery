const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const filePath = path.join(__dirname, 'pgsql_listings.csv');
const writeListings = fs.createWriteStream(`${filePath}`);
writeListings.write('id', 'agent_id','listing_address','price', 'numBedrooms', 'numBathrooms', 'sqft', 'saleStatus\n', 'UTF-8');

const getRandomNum = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min);
};

const createCSV = (writer, encoding, callback) => {
    let i = 1000000;
    const write = () => {
        let ok = true;
        do {
            i-=1;
            const id = i;
            const agent_id = getRandomNum(0, 10000);
            const listing_address = faker.address.streetAddress() + faker.address.streetName()
                + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode();
            const price = getRandomNum(100000, 5000000);
            const numBedrooms = getRandomNum(1, 10);
            const numBathrooms = getRandomNum(1, 10);
            const sqft = getRandomNum(800, 10000);
            const saleStatus = ["For Sale", "Pending", "Sold"][getRandomNum(0, 3)];
            const data = `${id},${agent_id},${listing_address},${price},${numBedrooms},${numBathrooms},${sqft},${saleStatus}\n`;
            if (i === 0) {
                writer.write(data, encoding, callback);
            } else {
                ok = writer.write(data, encoding);
            }
        } while (i > 0 && ok);
        if (i > 0) {
            writer.once('drain', write);
        }
    };
    write();
};

const writeCSV_Listings = () => new Promise((resolve, reject) => {
    createCSV(writeListings, 'utf-8', () => {
      writeListings.end();
      resolve('done');
    });
});
  
  module.exports.writeCSV_Listings = writeCSV_Listings;