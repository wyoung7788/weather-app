import axios from 'axios';
import React, {useState} from 'react';

function App(){
  const [data, setData] = useState({});
  // parse through input to get location
  const [location, setLocation] = useState('');
  //const [coords, setCoords]= useState({ lat: '', lon:''});
  const kelvintoFahrenheit = (k) => ((k-273.15)*9/5 + 32).toFixed(0);

  const searchLocation = async (event) =>{
    if (event.key === 'Enter'){
      const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=32.715736&lon=-117.161087&appid=5517fadcca0ae0eed1a332059c8f05b1`
      axios.get(weather_url).then((response)=>{
        setData(response.data)
        console.log(response.data)

      })
      setLocation('')
      //get location based on input
      //const parts = location.split(',');
       /*
     const geo_url= `https://api.openweathermap.org/geo/1.0/direct?q=SanDiego,CA,USA&limit=1&appid=5517fadcca0ae0eed1a332059c8f05b1`
      
        const geoResponse = await axios.get(geo_url);
        if (geoResponse.data.length > 0){
          const {lat, lon} = geoResponse.data[0];
          //setCoords({ lat, lon });
        */
        // get weather details 
    }
  };
  
//convert default kelvin to fahrenheit

  return (
    <div className="app">
    <div className= "label">
        New York, NY, USA (US Cities)
      </div>
      <div className="label">
        Rome, IT (Non-US Cities)
      </div>
      <div className="search">
        <input
        value="San Diego"
        //take in city name, backend to convert to coordinates
        onChange={(event) => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder='Enter city'
        type="text"
        />
      </div>
        <div className="container">
          <div className="top">
            <div className="location">
            <p>San Diego</p>
            </div>
            <div className="temp">
            <p>{data.main? `${kelvintoFahrenheit(data.main.temp)}°F` : ''}</p>
            </div>
            <div className="description">
              <p>Weather Description</p>
            </div>
          </div>
        
        <div className="bottom">
          <div className="feels">
            <p>Feels like</p>
          </div>
          <div className="humidity">
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p>Wind Speed</p>
          </div>
        </div>     
        </div>
        </div>

        
  
);
}

export default App;
