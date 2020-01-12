'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pg = require('pg');


const client = require('./modules/client.js')
const location = require('../modules/location.js')
const weather = require('../modules/weather.js')
const events = require('../modules/events.js')
const movies = require('../modules/movies.js')
const yelp = require('../modules/yelp.js')
const trails = require('../modules/trails.js')


const PORT = process.env.PORT || 8080;
const server = express();
server.use(cors());


server.get('/', serverislife);
server.get('/location', locationHandler);
server.get('/weather', weatherHandler);
server.get('/events', eventsHandler);
server.get('/yelp', yelpHandler);
server.get('/movies', moviesHandler);
server.get('/trails', trailsHandler)



server.use(`*`, notFound);
server.use(errorHandler);



function serverislife(req, res) {
    res.status(200).send('WElcome to the City Explorer');
}

function locationHandler(req, res) {
    const cityName = req.query.city;
    location.getLocation(cityName)
        .then(locationData => {
            res.status(200).json(locationData)
        })
        .catch(error => {
            errorHandler(error, req, res)
        })
}

function weatherHandler(req, res) {
    const place = req.query
    weather.getWeather(place)
        .then(weatherData => {
            res.status(200).json(weatherData)
        })
        .catch(error => {
            errorHandler(error, req, res)
        })
}

function eventsHandler(req, res) {
    const place = req.query
    events.getEvents(place)
        .then(eventsData => {
            res.status(200).json(eventsData)
        })
        .catch(error => {
            errorHandler(error, req, res)
        })
}

function moviesHandler(req, res) {
    const place = req.query;
    movies.getMovies(place)
        .then(moviesData => {
            res.status(200).json(moviesData)
        })
        .catch(error => {
            errorHandler(error, req, res)
        })
}

function yelpHandler(req, res) {
    const place = req.query
    yelp.getYelp(place)
        .then(yelpData => {
            res.status(200).json(yelpData)
        })
        .catch(error => {
            errorHandler(error, req, res)
        })
}

function trailsHandler(req, res) {
    const place = req.query;
    trails.getTrails(place)
        .then(trailsData => {
            res.status(200).json(trailsData)
        })
        .catch(error => {
            errorHandler(error, req, res)
        })
}

function notFound(req, res) {
    res.status(404).send('NOT-FOUND')
}

function errorHandler(error, req, res) {
    res.status(500).send(error)
}


client.connect()
    .then(
        server.listen(PORT, () => console.log(`Welcome listening on ${PORT}`))
    );