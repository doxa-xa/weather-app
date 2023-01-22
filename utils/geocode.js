const request = require('request')

const geocode = (address, callback) =>{
    const url ='http://api.positionstack.com/v1/forward?access_key=abb1c7c184b335cb2333682d287fc039&query='+address+'&output=json'
    request({url:url,json:true},(err,resp)=>{
        if(err){
            callback('Unable to connect to location services',undefined)
        }else if(resp.body.data.length===0){
            callback('Unable to find location try another search',undefined)
        }else{
            callback(undefined,{
                latitude: resp.body.data[0].latitude,
                longitude: resp.body.data[0].longitude,
                location: resp.body.data[0].name
            })
        }
    })
}

module.exports = geocode