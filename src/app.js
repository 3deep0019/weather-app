const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 5000



app.use(express.static(path.join(__dirname,'../public')))



const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
	res.render('index',{
		title:'Weather',
		name:'Trideep'
	})
})

app.get('/about',(req,res)=>{
	res.render('about',{
		title:'About',
		name:'Trideep'
	})
})

app.get('/help',(req,res)=>{
	res.render('help',{
		title:'Help',
		message:'This is some helpful text',
		name:'Trideep'
	})
})

app.get('/weather',(req,res)=>{
	if (!req.query.address) {
		return res.send({
			error:'No address?'
		})
	}
	
 geocode(req.query.address,(error,{latitude,longitude,placeName} ={})=>{
 	if (error) {
 		return res.send({
 			error})
 	}
 	forecast(latitude, longitude, (error, forecastData, p) => {
	  if (error) {
	  	return res.send({
	  		error})
	  }
	  res.send({
	  	Location:placeName,
	  	Forecast:forecastData.data,
	  	address:req.query.address
	  })
	})
 })
})
 
app.get('/weather/getlocation',(req,res)=>{
	if (!req.query.lati && !req.query.longi) {
		return res.send({
			error:'Geo Location Not Supported'
		})
	}
	forecast(req.query.lati, req.query.longi, (error, forecastData) => {
	  if (error) {
	  	return res.send({
	  		error})
	  }
	  res.send({
	  	Location:forecastData.placeName,
	  	Forecast:forecastData.data,
	  	address:req.query.address
	  })
	})
})

app.get('/help/*',(req,res)=>{
	res.render('404',{
		message:'Help Article not found',
		title:'404',
		name:'Trideep'
	})
})
app.get('*',(req,res)=>{
	res.render('404',{
		message:'Page Not Found',
		title:'404',
		name:'Trideep'
	})
})

app.listen(port,()=>{
	console.log('Server is running on port ' + port)
})
