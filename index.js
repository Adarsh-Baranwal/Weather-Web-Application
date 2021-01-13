const request = require("request");
const express = require("express");
const path = require("path");
const { stringify } = require("querystring");
const app = express();
const port = 80;
const dotenv=require('dotenv').config()
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true }))
// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
// ENDPOINTS

app.get('/',(req,res)=>{
  res.status(200).render('main.pug');
})

// app.get('/weather', function (req, res) {
//   res.status(200).render('demo.pug');
// })

let city = '';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.api_Key}`
let weather;
  // app.get('/',(req,res)=>{
  //   city=req.query.city;
  //   //console.log(req.body)
  //   res.redirect('/weather');
  //    })
    
    app.get('/demo', function (req, res) {
      city=req.query.city;
      url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.api_Key}`
      request(url,function(err,response,body){
        if(err || response.statusCode!=200)
        {
          console.error('error :',err);
          res.render('error.pug');
        }
        else
        {
          //console.log(body);
          weather=JSON.parse(body);
          //console.log(weather);
          para={'temp':weather.main.temp,'feels_like':weather.main.feels_like,'temp_min':weather.main.temp_min,'temp_max':weather.main.temp_max,'pressure':weather.main.pressure,'humidity':weather.main.humidity,'visibility':weather.visibility,'speed':weather.wind.speed,'discription':weather.weather[0].description,'city':city};
          res.status(200).render('demo.pug',para);
        }
      })
    })


app.listen(port, ()=>{
     console.log(`The application started successfully on port ${port}`);
 });