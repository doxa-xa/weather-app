const request = require('request')

const forecast = (lat,lon,callback)=>{
    const url ='http://api.weatherapi.com/v1/current.json?key=0aad7a89f15c4c28b38231308231401&q='+lat+','+lon+'&aqi=no'
    request({url:url,json:true},(err,resp)=>{
        if(err){
            callback('No connection with the weather api',undefined)
        }else if(resp===undefined){
            callback('Please choose another location',undefined)
        }else{
            const weather ={
                place: resp.body.location.name,
                temp: resp.body.current.temp_c,
                feelsLike: resp.body.current.feelslike_c,
                condition: resp.body.current.condition.text
            }
            callback(undefined,weather)
        }

    })
}

module.exports = forecast