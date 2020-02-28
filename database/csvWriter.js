const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const faker = require('faker');
const path = require('path');

const getRandomNum = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min);
}

const PGSQL_listings_records = [];
const PGSQL_photos_records = [];
const PGSQL_users_records = [];
const PGSQL_saved_records =  []; 
const MONGO_listings_records = [];

const seeder = (n, type) => {
    console.time(`${type} seed`);
    if (type === 'PGSQL_listings') {
        for (var i = 0; i < n; i++) {
            const id = i;
            const agent_id = getRandomNum(0, 10000);
            const listing_address = faker.address.streetAddress() + faker.address.streetName()
                + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode();
            const price = getRandomNum(100000, 5000000);
            const numBedrooms = getRandomNum(1, 10);
            const numBathrooms = getRandomNum(1, 10);
            const sqft = getRandomNum(800, 10000);
            const saleStatus = ["For Sale", "Pending", "Sold"][getRandomNum(0, 3)];
            PGSQL_listings_records.push([id, agent_id, listing_address, price, numBedrooms, numBathrooms, sqft, saleStatus]);
        
        }
    } else if (type === 'PGSQL_photos') {
        for (var j = 0; j < n; j++) {
            const id = j;
            const photo_url = faker.image.image();
            const listing_id = getRandomNum(0, 10000);
            PGSQL_photos_records.push([id, photo_url, listing_id]);
        }
    } else if (type === 'PGSQL_users') {
        for (var k = 0; k < n; k++) {
            const id = k;
            PGSQL_users_records.push([id]);
        }
    } else if (type === 'PGSQL_saved') {
        for (var l = 0; l < n; l++) {
            const saved = getRandomNum(0, 1) >= 0.5;
            const listing_id = getRandomNum(0, l);
            const users_id = getRandomNum(0, l);
            PGSQL_saved_records.push([saved, listing_id, users_id]);
        }
    } 
    else if (type === 'MONGO_listings') {
        for (var m = 0; m < n; m++) {
            const listing_id = m;
            const agent_id = getRandomNum(0, 1000);
            const listing_address = faker.address.streetAddress() + faker.address.streetName()
                + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode();
            const price = getRandomNum(100000, 5000000);
            const numBedrooms = getRandomNum(1, 10);
            const numBathrooms = getRandomNum(1, 10);
            const sqft = getRandomNum(800, 10000);
            const saleStatus = ["For Sale", "Pending", "Sold"][getRandomNum(0, 2)];
            const images = [...Array(getRandomNum(0, 10)).keys()].map( i => ({ image_id: i, image_url: faker.image.image() }))
            const savedByUsers = [...Array(getRandomNum(0, 10)).keys()].map( i => ({ user_id: i }));
            MONGO_listings_records.push([listing_id, agent_id, listing_address, images, price, numBedrooms, numBathrooms, sqft, saleStatus, savedByUsers])
        }
    }
    console.timeEnd(`${type} seed`);
    
}

// seeder(10000000,'PGSQL_listings');
// seeder(50000000,'PGSQL_photos');
// seeder(50000000,'PGSQL_users');
// seeder(10000000,'PGSQL_saved');
seeder(10000000,'MONGO_listings');

const csvWriter = (csvFile, columns, records) => {
    const csvWriterTemplate = createCsvWriter({
        path: path.join(__dirname, csvFile),
        header: columns
    }) 
    console.time(`${csvFile.substring(0, csvFile.length-4)} csv write`);
    csvWriterTemplate.writeRecords(records)
        .then(() => {
            console.timeEnd(`${csvFile.substring(0, csvFile.length-4)} csv write`)
            // console.log("successfully write listings data into csv");
        })
        .catch(() => {
            console.error();
        })
}

// csvWriter('PGSQL_listings.csv', ['id','agent_id','listing_address','price','numBedrooms','numBathrooms','sqft','saleStatus'], PGSQL_listings_records);
// csvWriter('PGSQL_photos.csv', ['id', 'photo_url', 'listing_id'], PGSQL_photos_records);
// csvWriter('PGSQL_users.csv', ['id'], PGSQL_users_records);
// csvWriter('PGSQL_saved.csv', ['saved', 'listing_id', 'users_id'], PGSQL_saved_records);
csvWriter('mongo_listings.csv', ['listing_id', 'agent_id', 'listing_address', 'images', 'price', 'numBedrooms', 'numBathrooms', 'sqft', 'saleStatus', 'savedByUsers'], MONGO_listings_records);


// const csvWriterPGSQL_Listings = createCsvWriter({
//     path: path.join(__dirname, 'sql_Listings.csv'),
//     header: ['id','agent_id','listing_address','price','numBedrooms','numBathrooms','sqft','saleStatus']
// })

// const csvWriterPGSQL_Photos = createCsvWriter({
//     path: path.join(__dirname, 'sql_Photos.csv'),
//     header: ['id', 'photo_url', 'listing_id']
// })

// const csvWriterPGSQL_Users = createCsvWriter({
//     path: path.join(__dirname, 'sql_Users.csv'),
//     header: ['id']
// })

// const csvWriterPGSQL_Saved = createCsvWriter({
//     path: path.join(__dirname, 'sql_Saved.csv'),
//     header: ['saved', 'listing_id', 'users_id'],
// })


// console.time("PGSQL_listings csv write");
// csvWriterPGSQL_Listings.writeRecords(PGSQL_listings_records)
//     .then(() => {
//         console.timeEnd("PGSQL_listings csv write")
//         // console.log("successfully write listings data into csv");
//     })
//     .catch(() => {
//         console.error();
//     })

// console.time("PGSQL_photos csv write");
// csvWriterPGSQL_Photos.writeRecords(PGSQL_photos_records)
//     .then(() => {
//         console.timeEnd("PGSQL_photos csv write");
//         // console.log("successfully write listings data into csv");
//     })
//     .catch(() => {
//         console.error();
//     })

// console.time("PGSQL_users csv write");
// csvWriterPGSQL_Users.writeRecords(PGSQL_users_records)
//     .then(() => {
//         console.timeEnd("PGSQL_users csv write");
//         // console.log("successfully write users data into csv");
//     })
//     .catch(() => {
//         console.error();
//     })

// console.time("PGSQL_saved csv write");
// csvWriterPGSQL_Saved.writeRecords(PGSQL_saved_records)
//     .then(() => {
//         console.timeEnd("PGSQL_saved csv write");
//         // console.log("successfully write saved data into csv");
//     })
//     .catch(() => {
//         console.error();
//     })