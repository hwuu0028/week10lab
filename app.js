//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();

app.listen(8080);

//Week 10 Content
//And request other than CRUD operations should be redirected to dist/movieAng
let path = require('path');
console.log(__dirname);

app.use('/', express.static(path.join(__dirname,"dist/movieAng")));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/lab8', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);

//task 2
app.delete('/actorsMovies/:id', actors.deleteManyMovies);
//task 3
app.post('/actor/:actorId/:movieId', actors.deleteMovie);


//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);

//tasks 1
app.delete('/movies/:id', movies.deleteOne);
//task 4
app.post('/movies/:movieId/:actorId', movies.deleteActor);
//task 5
app.post('/movies/:id/actors', movies.addActor);
//task 6
app.get('/movies/:year1/:year2', movies.getBetween);
//extra task
app.put('/moviesIncrement', movies.incrementMovies);