const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost/xillow';
const ListingModel = require('./schema.js');

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// functions for the queries in db
module.exports = {
    gallery: {
        getListing: (id, callback) => {
            ListingModel.find({ listing_id: Number(id)})
                .then((results) => {
                    callback(null, results);
                }) 
                .catch((error) => {
                    callback(error);
                })
        },
        getAllListings: (callback) => {
            ListingModel.find({})
                .then((results) => {
                    callback(null, results);
                }) 
                .catch((error) => {
                    callback(error);
                })
        },
        addListing: (data, callback) => {
            const ListingInstance = new ListingModel(data);
            ListingInstance.save()
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })

        },
        updateListing: (id, data, callback) => {
            ListingModel.updateOne({ listing_id: Number(id) }, data )
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })
        },
        updatePartOfListing: (id, data, callback) => {
            ListingModel.updateOne({ listing_id: Number(id) }, { $set: data } )
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })
        },
        deleteListing: (id, callback) => {
            ListingModel.deleteOne({ listing_id: Number(id) })
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })
        },
        deleteAllListings: (callback) => {
            ListingModel.deleteMany({})
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })
        }        
    }
}