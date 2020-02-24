const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost/xillow';
const ListingModel = require('./schema.js');

mongoose.connect(mongoUrl);

// functions for the queries in db
module.exports = {
    gallery: {
        getOne: (id, callback) => {
            ListingModel.find({ listing_id: Number(id)})
                .then((results) => {
                    callback(null, results);
                }) 
                .catch((error) => {
                    callback(error);
                })
        },
        getAll: (callback) => {
            ListingModel.find({})
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })
        },
        postOne: (data, callback) => {
            const ListingInstance = new ListingModel(data);
            ListingInstance.save()
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })

        },
        updateOne: (id, data, callback) => {
            ListingModel.updateOne({ listing_id: Number(id) }, data )
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })
        },
        updateOnePart: (id, data, callback) => {
            ListingModel.updateOne({ listing_id: Number(id) }, { $set: data } )
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })
        },
        deleteOne: (id, callback) => {
            ListingModel.deleteOne({ listing_id: Number(id) })
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })
        },
        deleteAll: (callback) => {
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