const mongoose = require('mongoose');
// const fakeData = require('./fakeData.js');
// const seedData = fakeData.seedData;

// Create a new xillow db and drop if it exists
// mongoose.connect('mongodb://localhost/xillow');
// mongoose.connection.dropDatabase();

const ListingSchema = mongoose.Schema({
  listing_id: { type: Number, required: true, unique: true },
  agent_id: { user_id: { type: Number, required: true } }, 
  listing_address: { type: String, required: true},
  images: [ { image_id: Number, image_url: String, required: true } ],
  price: { type: Number, required: true },
  numBedrooms: { type: Number, required: true },
  numBathrooms: { type: Number, required: true },
  sqft: { type: Number, required: true },
  saleStatus: { type: String, required: true },
  savedByUsers: [ { user_id: { type: Number, required: true, unique: true } } ]
});

// const UserSchema = mongoose.Schema({
//   user_id: { type: Number, required: true, unique: true },
//   agentOfListings: [ { listing_id: Number }],
//   savedListings: [ { listing_id: Number } ]
// })

const ListingModel = mongoose.model('ListingModel', ListingSchema);
// const UserModel = mongoose.model('UserModel', UserSchema);
module.exports = {ListingModel};

