var express = require('express');
var router = express.Router();
const ctrl = require('../controllers/weather');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weather App', message:'', forecast: '' });
});

router.post('/weather', ctrl.fetchWeather);

module.exports = router;
