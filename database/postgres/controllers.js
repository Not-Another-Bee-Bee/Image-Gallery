const models = require('./models.js');

module.exports.controller = {
    gallery: {
        getListing: (req, res) => {
            const id = parseInt(req.params.id);
            models.gallery.getListing(id, (error, results) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    console.log(`GET listing w/ id of ${id}`)
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
        addPhoto: (req, res) => {
            models.gallery.addPhoto(req.body, (error) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`ADDED photo`);
                }
            })
        },
        updateListing: (req, res) => {
            const id = parseInt(req.params.id);
            models.gallery.updateListing(id, req.body, (error) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`UPDATED listing w/ id of ${id}`);
                }
            } )
        },
        updatePhoto: (req, res) => {
            const id = parseInt(req.params.id);
            models.gallery.updatePhoto(id, req.body, (error) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`UPDATED photo w/ id of ${id}`);
                }
            } )
        },
        deleteListing: (req, res) => {
            const id = parseInt(req.params.id);
            models.gallery.deleteListing(id, (error) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`DELETED listing w/ id of ${id}`);
                }
            })
        },
        deletePhoto: (req, res) => {
            const id = parseInt(req.params.id);
            models.gallery.deletePhoto(id, (error) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    res.status(200).send(`DELETED photo w/ id of ${id}`);
                }
            })
        }
    }
}