const request = require('request')
const forecast = (lati,long,callback)=>{
	const url = 'http://api.weatherstack.com/current?access_key=8e60607362643be9d5c4814273cf80f7&query=' + lati + ',' + long
	request({ url,json:true },(error,{ body }={})=>{
 	if (error) {
 		callback('Unable to Connect',undefined)
 	}else if (body.error) {
 		callback('Unable to Find the LOCATION',undefined)
 	}
 	else{
 		callback(undefined,body.current.weather_descriptions[0]+'. It is currently ' + body.current.temperature + ' degree outside.Its feels like ' + body.current.feelslike + ' degree outside.And the humidity is ' + body.current.humidity)
}
})
}

module.exports = forecast