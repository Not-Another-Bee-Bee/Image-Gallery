const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost/xillow';
const GalleryModel = require('../db/mongoSchema.js');

mongoose.connect(mongoUrl);

// functions for the queries in db
module.exports = {
    gallery: {
        getOne: (id, callback) => {
            GalleryModel.find({ listing_id: Number(id)})
                .then((results) => {
                    callback(null, results);
                }) 
                .catch((error) => {
                    callback(error);
                })
        },
        getAll: (callback) => {
            GalleryModel.find({})
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })
        },
        postOne: (data, callback) => {
            const GalleryInstance = new GalleryModel(data);
            GalleryInstance.save()
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })

        },
        updateOne: (id, data, callback) => {
            GalleryModel.updateOne({ listing_id: Number(id) }, data )
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })
        },
        updateOnePart: (id, data, callback) => {
            GalleryModel.updateOne({ listing_id: Number(id) }, { $set: data } )
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })
        },
        deleteOne: (id, callback) => {
            GalleryModel.deleteOne({ listing_id: Number(id) })
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })
        },
        deleteAll: (callback) => {
            GalleryModel.deleteMany({})
                .then((results) => {
                    callback(null, results);
                })
                .catch((error) => {
                    callback(error);
                })
        }        
    }
}