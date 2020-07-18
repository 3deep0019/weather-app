const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const geoLocation = document.querySelector('#geoloc')
const messageOne = document.querySelector('#message_1')
const messageTwo = document.querySelector('#message_2')

weatherform.addEventListener('submit',(e)=>{
	e.preventDefault()
	const location = search.value
	messageOne.setAttribute('class','alert alert-warning')
	messageOne.textContent = 'Loading......'
	messageTwo.setAttribute('class','')
	messageTwo.textContent = ' '
	fetch('/weather?address='+ search.value).then((response)=>{
	response.json().then((data)=>{
		if (data.error) {
			messageOne.setAttribute('class','alert alert-danger')
			messageOne.textContent = 'Error: ' + data.error
			messageTwo.setAttribute('class','')
			messageTwo.textContent = ' '
		}else{
			messageOne.setAttribute('class','alert alert-success')
			messageTwo.setAttribute('class','alert alert-success')
			messageOne.textContent = 'Location: ' + data.Location
			messageTwo.textContent = 'Forecast: ' + data.Forecast
		}
		search.value=''

	})
})

})

geoLocation.addEventListener('click',()=>{
	if (!navigator.geolocation) {
		messageOne.setAttribute('class','alert alert-danger')
		messageOne.textContent = 'Error: ' + 'Geolocation is not supported by your browser.'
		messageTwo.setAttribute('class','')
		messageTwo.textContent = ' '
	}else{
		messageOne.setAttribute('class','alert alert-warning')
		messageOne.textContent = 'Loading......'
		messageTwo.setAttribute('class','')
		messageTwo.textContent = ' '
		navigator.geolocation.getCurrentPosition((position)=>{ 
		fetch('/weather/getlocation?lati=' + position.coords.latitude + '&longi='+ position.coords.longitude).then((response)=>{
			response.json().then((data)=>{
				if (data.error) {
					messageOne.setAttribute('class','alert alert-danger')
					messageOne.textContent = 'Error: ' + data.error
					messageTwo.setAttribute('class','')
					messageTwo.textContent = ' '
				}else{
					messageOne.setAttribute('class','alert alert-success')
					messageTwo.setAttribute('class','alert alert-success')
					messageOne.textContent = 'Location: ' + data.Location
					messageTwo.textContent = 'Forecast: ' + data.Forecast
				}
			})
		})
	})
	}

	
	
})
