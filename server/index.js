const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const PORT = 3004;
const bodyParser = require('body-parser');
const Controller = require('../database/Controller.js');

// const schema = require('../database/schema.js');
// const retrieve = schema.retrieve;
// const save = schema.save;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/houses', retrieve);

// post request  
app.post('/houses', Controller.addHouse);

// get request for all handler
app.get('/houses', Controller.getAllHouses);

// get request by id handler
app.get('/houses/:houseId', Controller.getOneHouse) 

// put request by id handler
app.put('/houses/:houseId/', Controller.updateHouse);

// delete request by id handler
app.delete('/houses/:houseId', Controller.removeHouse);

app.listen(PORT, () => console.log('Listening on port: ' + PORT));