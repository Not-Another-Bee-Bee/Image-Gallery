const models = require('./models.js');

module.exports = {
    listings: {
        getListing: (req, res) => {
            const id = req.params.id;
            models.listings.getListing(id, (error, results) => {
                if (error) {
                    console.log('getListing', error);
                    res.status(500).send(error);
                } else {
                    console.log(`GET listing w/ id of ${id}`)
                    res.status(200).send(results);
                }
            })
        },
        addListing: (req, res) => {
            models.listings.addListing(req.body, (error) => {
                if (error) {
                    console.log('addListing', error);
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`ADDED listing`);
                }
            })
        },
        updateListing: (req, res) => {
            const id = req.params.id;
            models.listings.updateListing(id, req.body, (error) => {
                if (error) {
                    console.log('updateListing', error);
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`UPDATED listing w/ id of ${id}`);
                }
            })
        },
        deleteListing: (req, res) => {
            const id = req.params.id;
            models.listings.deleteListing(id, (error) => {
                if (error) {
                    console.log('deleteListing', error);
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`DELETED listing w/ id of ${id}`);
                }
            })
        }
    },
    photos: {
        addPhoto: (req, res) => {
            models.photos.addPhoto(req.body, (error) => {
                if (error) {
                    console.log('addPhoto', error);
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`ADDED photo`);
                }
            })
        },
        updatePhoto: (req, res) => {
            const id = req.params.id;
            models.photos.updatePhoto(id, req.body, (error) => {
                if (error) {
                    console.log('updatePhoto', error);
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`UPDATED photo w/ id of ${id}`);
                }
            })
        },
        deletePhoto: (req, res) => {
            const id = req.params.id;
            models.photos.deletePhoto(id, (error) => {
                if (error) {
                    console.log('deletePhoto', error);
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`DELETED photo w/ id of ${id}`);
                }
            })
        }
    }
}
