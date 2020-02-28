const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const PORT = 3004;
const bodyParser = require('body-parser');
// const router = require('express').Router();
const controller = require('../database/postgres/controller.js/index.js');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// LISTINGS API ROUTES
// route to handle retrieving a listing based on a user
app.get('/listings/:listingID/users/:userID', controller.gallery.getListing); 

// route to handle adding a listing
app.post('/listings', controller.gallery.addListing);

// route to handle adding a photo to a listing
app.post('/listings/:listingID/photos', controller.gallery.addPhoto);

// route to handle updating a listing
app.patch('/listings/:listingID', controller.gallery.updateListing);

// route to handle updating a photo
app.patch('/listings/:listingID/photos/:photoID', controller.gallery.updatePhoto);

// route to handle deleting a listing
app.delete('/listings/:listingID', controller.gallery.deleteListing);

// route to handle deleting a image 
app.delete('/listings/:listingID/photos/:photoID', controller.gallery.deletePhoto); 


app.listen(PORT, () => console.log('Listening on port: ' + PORT));