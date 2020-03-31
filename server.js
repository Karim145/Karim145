const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const ejsLint = require('ejs-lint');
const app = express()

const apiKey = '85019c5b78774d1a7aaf4d12d3238e91';

app.use(express.static('public')); // den använder public mappen som static
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs') // den sätter view engine som ejs

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {  //den postar funktionen
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'}); // om vädert är odifnerand den skickar error 
      } else {
        let weatherText = `It's ${weather.main.temp} °C in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log(' app listening on port 3000!')
})
