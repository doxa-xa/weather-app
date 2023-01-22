const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../weather-app/templates/views')
const partialsPath = path.join(__dirname,'../weather-app/templates/partials')

app.use(express.static(publicDirectoryPath))
//app.use(bodyParser.urlencoded({extended:false}))
//app.use(bodyParser.json())
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Welcome to Weather App'
    })
})
app.get('/weather',(req,res)=>{
    res.render('weather',{
        title:'Weather'
    })
   //console.log(req)
})
app.get('/weatherLocation',(req,res)=>{
    geocode(req.query.location,(error,response)=>{
        if(error){
             return console.log(error)
         }
             forecast(response.latitude,response.longitude, (err,resp)=>{
                 if(err){
                     console.log(err)
                 }
                 res.render('weatherLocation',{
                    title:'Weather in '+req.query.location,
                    place: resp.place,
                    condition: resp.condition,
                    temp: resp.temp,
                    feelLike: resp.feelsLike
                })
            })
     })   
    
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Stoyan Todorov',
        errorMessage:'Page not found'
    })
})

app.listen('3000',()=>{
    console.log('server is listening on port 3000')
})



