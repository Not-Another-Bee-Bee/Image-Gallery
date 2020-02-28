const faker = require('faker');
const mongoose = require('mongoose');
const ListingModel = require('./schema.js');
require('events').EventEmitter.prototype._maxListeners = 10000;
mongoose.set('useCreateIndex', true);

const getRandomNum = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min);
};

async function seedDB (outer, inner) {
    let counter = 0;
    for (let j = 0; j < outer; j++) {
        let inputArr = [];
        for (let i = 0; i < inner; i++) {
            let obj = {
                listing_id: counter,
                agent_id: getRandomNum(0, 10000000),
                streetAddress: faker.address.streetAddress(),
                streetName: faker.address.streetName(),
                city: faker.address.city(),
                usState: faker.address.stateAbbr(),
                zipcode: faker.address.zipCode(),
                price: getRandomNum(100000, 5000000),
                numBedrooms: getRandomNum(1, 10),
                numBathrooms: getRandomNum(1, 10),
                sqft: getRandomNum(800, 10000),
                saleStatus: ["For Sale", "Pending", "Sold"][getRandomNum(0, 2)],
                images: [...Array(getRandomNum(5, 10)).keys()].map( i => ({ image_id: i, image_url: faker.image.image() })),
                savedByUser: [...Array(getRandomNum(0, 10)).keys()].map( i => ({ user_id: i }))
            }
            inputArr.push(obj);
            counter ++;
        }
        console.log('done');
        await ListingModel.ListingModel.insertMany(inputArr);
    }
}

// seedMongo(10, 10);
seedDB(500, 20000);
console.time('seed time');
console.timeEnd('seed time');

