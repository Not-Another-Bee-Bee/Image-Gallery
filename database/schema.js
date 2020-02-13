const mongoose = require('mongoose');
// const fakeData = require('./fakeData.js');
// const seedData = fakeData.seedData;

// Create a new xillow db and drop if it exists
mongoose.connect('mongodb://localhost/xillow');
mongoose.connection.dropDatabase();


// Schema
const houseSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  address: { type: String, required: true, unique: true },
  images: [{ type: String }],
  description: String,
});

// Model
const House = mongoose.model('House', houseSchema);

// Save helper function
const save = (individualHouse) => {
  let newHouse = House({
    id: individualHouse.id,
    address: individualHouse.address,
    images: individualHouse.images,
    description: `Price: ${individualHouse.description.price.toString()} bedrooms: ${individualHouse.description.bdrm}  bathrooms: ${individualHouse.description.bthrm} sqft: ${individualHouse.description.sqft}`,
  });

  newHouse.save((err, success) => {
    if (err) {
      console.log(err);
    } else {
      console.log('House created!');
    }
  });
};

// Seed the mock data
// let sampleHouses = seedData(100);
// sampleHouses.forEach(house => save(house));


// Retrieve helper function
const retrieve = (req, res) => {
  House.find({}).limit(1).exec((err, houses) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(houses);
    }
  });
};

module.exports = { retrieve, save };
