const fs = require('fs');
const faker = require('faker');
const path = require('path');

const filePath = path.join(__dirname, 'mongo_listings.csv');

// Use fs module to create a stream, name the file, and write headers for CSV file. Include encoding ‘utf-8’.  
const writeListings = fs.createWriteStream(`${filePath}`);
writeListings.write('id/ agent_id/ streetAddress/ streetName/ city/ usState/ zipcode/ price/ numBedrooms/ numBathrooms/ sqft/ saleStatus/ images/ savedByUsers\n', 'utf8');

const getRandomNum = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min);
};

// This will create 10 million listing files. Create the data as comma separated values 
const writeTenMillionListings = (writer, encoding, callback) => {
    let i = 10000000;
    let id = 0;
    const write = () => {
        let ok = true;
        do {
            i-=1;
            id += 1;
            const agent_id = getRandomNum(0, 1000);
            const streetAddress = faker.address.streetAddress();
            const streetName = faker.address.streetName();
            const city = faker.address.city();
            const usState = faker.address.stateAbbr();
            const zipcode = faker.address.zipCode();
            const price = getRandomNum(100000, 5000000);
            const numBedrooms = getRandomNum(1, 10);
            const numBathrooms = getRandomNum(1, 10);
            const sqft = getRandomNum(800, 10000);
            const saleStatus = ["For Sale", "Pending", "Sold"][getRandomNum(0, 2)];
            const images = [...Array(getRandomNum(0, 10)).keys()].map( i => ({ image_id: i, image_url: faker.image.image() }))
            const savedByUsers = [...Array(getRandomNum(0, 10)).keys()].map( i => ({ user_id: i }));
            const data = `${id}/${agent_id}/${streetAddress}/${streetName}/${city}/${usState}/${zipcode}/${price}/${numBedrooms}/${numBathrooms}/${sqft}/${saleStatus}/${images}/${savedByUsers}\n`;
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

    writer.on('finish', () => {
        console.log('wrote all data to file');
    });
};

writeTenMillionListings(writeListings, 'utf8', () => {
    writeListings.end();
});
