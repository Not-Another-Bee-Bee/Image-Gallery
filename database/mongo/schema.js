const mongoose = require('mongoose');

// Create a new xillow db and drop if it exists
mongoose.connect('mongodb://localhost/xillow', { useNewUrlParser: true, useUnifiedTopology: true } );
mongoose.connection.dropDatabase();
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function() { console.log("connected to DB")});

const ListingSchema = mongoose.Schema({
  listing_id: { type: Number, required: true, unique: true },
  agent_id: { user_id: {type: Number, required: true } }, 
  streetAddress: { type: String, required: true },
  streetName: { type: String, required: true },
  city: { type: String, required: true },
  usState: { type: String, required: true },
  zipcode: { type: String, required: true },
  images: [ { image_id: Number, image_url: String } ],
  price: { type: Number, required: true },
  numBedrooms: { type: Number, required: true },
  numBathrooms: { type: Number, required: true },
  sqft: { type: Number, required: true },
  saleStatus: { type: String, required: true },
  savedByUsers: [ { user_id: { type: Number, required: true } } ]
});

const ListingModel = mongoose.model('ListingModel', ListingSchema);
module.exports = {ListingModel};

