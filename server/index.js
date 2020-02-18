const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const PORT = 3004;
const bodyParser = require('body-parser');
// const router = require('express').Router();
const controller = require('../database/controllers/controller.js');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// LISTINGS API ROUTES

// route to handle retrieving a image for a given listing
app.get('/listings/:listingID/images/:imageID', controller.gallery.handleGetOne); 

// route to handle retrieving all images for a given listing
app.get('/listings/:listingID/images', controller.gallery.handleGetAll);

// route to handle adding a image for a given listing and agent
app.post('/listings/:listingID/agents/:agentID/image', controller.gallery.handlePostOne);

// route to handle updating a image for a given listing and agent
app.put('/listings/:listingID/agents/:agentID/images/:imageID', controller.gallery.handleUpdateOne);

// route to handle partial update of a image for a given listing and agent
app.patch('/listings/:listingID/agents/:agentID/images/:imageID', controller.gallery.handlePartialUpdateOne);

// route to handle deleting a image for a given listing and agent
app.delete('/listings/:listingID/agents/:agentID/images/:imageID', controller.gallery.handleDeleteOne);

// route to handle deleting all images for a given listing and agent
app.delete('/listings/:listingID/agents/:agentID/images', controller.gallery.handleDeleteAll); 


app.listen(PORT, () => console.log('Listening on port: ' + PORT));