const models = require('../models/models.js');

module.exports.controller = {
    gallery: {
        handleGetOne: (req, res) => {
            // get one house with id as paramater 
            const {id} = req.params
            models.gallery.getOne(id, (error, results) => {
                if (error) {
                    res.status(500).end();
                } else {
                    res.status(200).send(results);
                }
            })
        },
        handleGetAll: (req, res) => {
            // get all houses' data
            models.gallery.getAll((error, results) => {
                if (error) {
                    res.status(500).end();
                } else {
                    res.status(200).send(results);
                }
            })
        },
        handlePostOne: (req, res) => {
            // add a house's data
            models.gallery.postOne(req.body, (error, results) => {
                if (error) {
                    res.status(500).end();
                } else {
                    res.status(200).send(results);
                }
            })
        },
        handleUpdateOne: (req, res) => {
            // update house data with id as parameter
            const {id} = req.params;
            models.gallery.updateOne(id, (error, results) => {
                if (error) {
                    res.status(500).end();
                } else {
                    res.status(200).send(results);
                }
            })
        },
        handlePartialUpdateOne: (req, res) => {
            // update part of a house's data with id as a parameter
            const {id} = req.params;
            models.gallery.updateOnePart(id, (error, results) => {
                if (error) {
                    res.status(500).end();
                } else {
                    res.status(200).send(results);
                }
            } )
        },
        handleDeleteOne: (req, res) => {
            // delete house data with id as parameter
            const {id} = req.params
            models.gallery.deleteOne(id, (error, results) => {
                if (error) {
                    res.status(500).end();
                } else {
                    res.status(200).send(results);
                }
            })
        },
        handleDeleteAll: (req, res) => {
            // delete all houses' data
            models.gallery.deleteAll((error, results) => {
                if (error) {
                    res.status(500).end();
                } else {
                    res.status(200).send(results);
                }
            })
        }
    }
}