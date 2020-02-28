const fs = require('fs');
const faker = require('faker');
const path = require('path');

const filePath = path.join(__dirname, 'pgsql_listings.csv');

// Use fs module to create a stream, name the file, and write headers for CSV file. Include encoding ‘utf-8’.  
const writeListings = fs.createWriteStream(`${filePath}`);
writeListings.write('id, listing_address, price, numBedrooms, numBathrooms, sqft, saleStatus, agent_id\n', 'utf8');

const getRandomNum = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min);
};

// This will create 10 million listing files. Create the data as comma separated values 
const createCSV = (writer, encoding, callback) => {
    let i = 10000000;
    let id = 0;
    const write = () => {
        let ok = true;
        do {
            i-=1;
            id += 1;
            const agent_id = getRandomNum(0, 1000000);
            const listing_address = faker.address.streetAddress() + '/' + faker.address.streetName()
                + '/' + faker.address.city() + '/' + faker.address.stateAbbr() + '/' + faker.address.zipCode().slice(0, 5);
            const price = getRandomNum(100000, 5000000);
            const numBedrooms = getRandomNum(1, 10);
            const numBathrooms = getRandomNum(1, 10);
            const sqft = getRandomNum(800, 10000);
            const saleStatus = ["For Sale", "Pending", "Sold"][getRandomNum(0, 3)];
            const data = `${id},${listing_address},${price},${numBedrooms},${numBathrooms},${sqft},${saleStatus},${agent_id}\n`;
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

createCSV(writeListings, 'utf8', () => {
    writeListings.end();
});
