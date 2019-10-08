var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');

module.exports = {

    getAll: function (req, res) {
        Movie.find().populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);

            res.json(movies);
        });
    },


    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },


    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },


    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },
    //task 1
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },

    //task 4
    deleteActor: function (req, res) {
        Movie.findById(req.params.movieId).exec(function(err, movie){
            Actor.findById(req.params.actorId).exec(function(err, actor){
                movie.actors.pull(actor);
                movie.save(function(err){
                    res.json({
                        msg: "actor removed"
                    });
                })
            })
        })
    },
    //task 5
    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            })
        });
    },
    // task 6
    getBetween: function(req, res) {
        Movie.where("year").gt(parseInt(req.params.year1)).where("year").lt(parseInt(req.params.year2)).exec(function(err,movie){
            if(err) return res.status(400).json(err);
            if(!movie) return res.status(404).json();
            res.json(movie);
        })
    },
    //extra task
    incrementMovies: function(req, res){
        Movie.updateMany({"year": {$gt: 1995}},{$inc: {"year": 7}}, {upsert: true},function(err,result){
            res.json(result);

        });

    },
    task: function(req, res){
        Actor.deleteMany({"year": {$gt: 2004}}, function(err) {
            if (!err) {
                    message.type = 'notification!';
            }
            else {
                    message.type = 'error';
            }
        });
    }


};