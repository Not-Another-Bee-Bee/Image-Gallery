const models = require('./models.js');

module.exports.controller = {
    gallery: {
        getListing: (req, res) => {
            const {id} = req.params;
            models.gallery.getListing(id, (error, results) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    console.log(`GET listing w/ id of ${id}`)
                    res.status(200).send(results);
                }
            })
        },
        getAllListings: (req, res) => {
            models.gallery.getAllListings(id, (error, results) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    console.log(`GET all listings`)
                    res.status(200).send(results);
                }
            })
        },
        addListing: (req, res) => {
            models.gallery.addListing(req.body, (error) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`ADDED listing`);
                }
            })
        },
        updateListing: (req, res) => {
            const {id} = req.params;
            models.gallery.updateListing(id, req.body, (error) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`UPDATED listing w/ id of ${id}`);
                }
            } )
        },
        updatePartOfListing: (req, res) => {
            // update part of a house's data with id as a parameter
            const {id} = req.params;
            models.gallery.updateListingPrice(id, req.body, (error) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`UPDATED listing's price w/ id of ${id}`);
                }
            } )
        },
        deleteListing: (req, res) => {
            const {id} = req.params;
            models.gallery.deleteListing(id, (error) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`DELETED listing w/ id of ${id}`);
                }
            })
        }
    }
}