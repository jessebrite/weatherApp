const request = require('request');

const fetchWeather = (req, res) => {
  const url  = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY = process.env.API_KEY;
  let city = req.body.city;
  const params = [
    `q=${city}`,
    `appid=${API_KEY}`,
    `units=metrics`
  ].join('&');

  const queryURL = `${url}?${params}`

  request(queryURL, (err, {statusCode}, body) => {
    body = JSON.parse(body);

    let country = (body.sys.country) ? body.sys.country : '' ;
    let forecast = "For city "+city+', country '+country;

    if (err) {
      return res.status(404).send({ error: true, body: 'Nothing found' })
    } else if (statusCode !== 200) {
      return res.status(401).send({ error: true, body: body});
    } else {
      // return res.status(200).json({error: false, message: body, forecast: forecast})
      return res.render('index', {
        title: 'Weather App',
        error: false,
        body: body,
        forecast: forecast
      });
    }
  });
}

module.exports = {
  fetchWeather
};
