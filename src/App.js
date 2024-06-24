import axios from 'axios'
import React, {useState} from 'react';

function App(){

  const [data, setData] = useState({})
  const [location, setLocation] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [coords, setCoords]= useState({ lat: '', lon:''});

  const searchLocation = async (event) =>{
    if (event.key === 'Enter'){
      //get location based on input
      const geo_url= `https://api.openweathermap.org/geo/1.0/direct?q=${location},{state code},{country code}&limit={limit}&appid=5517fadcca0ae0eed1a332059c8f05b1`
      
      try{
        const geoResponse = await axios.get(geo_url);
        if (geoResponse.data.length > 0){
          const {lat, lon} = geoResponse.data[0];
          setCoords({ lat, lon });
        
        // get weather details 
        const weather_url = `https://api.openweathermap.org/data/3.0/onecall?lat=${coords[0]}&lon=${coords[1]}&exclude={part}&appid=5517fadcca0ae0eed1a332059c8f05b1`
        const weatherResponse = await axios.get(weather_url);
        setData(weatherResponse.data);
        console.log(weatherResponse.data);
      } else{
        console.error("Location not found");
      }
    } catch (error){
        console.error("Error fetching data:", error);
      }
      setLocation('');
      setStateCode('');
      setCountryCode('');
  }
    
  return (
    <div className="app">
      <div className="search">
        <input
        value={location}
        //take in city name, backend to convert to coordinates
        onChange={(event) => setLocation(event.target.value)}
        placeholder='Enter city'
        type="text"
        />
        <input
          value={stateCode}
          onChange={(event) => setStateCode(event.target.value)}
          placeholder="Enter state code (US only)"
          type="text"
        />
        <input
          value={countryCode}
          onChange={(event) => setCountryCode(event.target.value)}
          placeholder="Enter country code"
          type="text"
        />
        <input
          onKeyPress={searchLocation}
          placeholder="Press Enter to search"
          type="text"
        />
      </div>
    <div className="container">
      <div className="top">
        <div className="location">
          <p>{data.timezone || 'Location'}</p>
        </div>
        <div className="temp">
          {data.current && <h1>{Math.round(data.current.temp)}°F</h1>}
        </div>
        <div className="description">
          {data.current && <p>{data.current.weather[0].description}</p>}
        </div>
      </div>
      <div className="bottom">
        <div className="feels">
        {data.current && <p>Feels Like: {Math.round(data.current.feels_like)}°F</p>}
        </div>
        <div className="humidity">
        {data.current && <p>Humidity: {data.current.humidity}%</p>}
        </div>
        <div className="wind">
        {data.current && <p>Wind: {Math.round(data.current.wind_speed)} MPH</p>}
        </div>
      </div>
    </div>
    </div>
  );
}
}
export default App;
