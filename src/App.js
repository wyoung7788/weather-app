import axios from 'axios';
import React, {useState} from 'react';
import LocationButton from './LocationButton';


function App(){
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const kelvintoFahrenheit = (k) => ((k-273.15)*9/5 + 32).toFixed(0);


  function handleLocationClick(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) =>{
        const {latitude, longitude} = position.coords;
        searchLocation(latitude, longitude);
    },
    (error) => {
      console.error("Error getting user location", error);
    }
    );
  }
};

  const searchLocation = async (latitude, longitude) =>{
      let lat, lon;
      if (latitude !== undefined && longitude !== undefined){
        lat = latitude;
        lon = longitude;
      }
      else{
      // convert inputted "San Diego" to coordinates 
      //(and then load onto screen)
      // take coordinates to call url to get weather details
      const geo_url= `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=5517fadcca0ae0eed1a332059c8f05b1`

      try{
        const geo_response = await axios.get(geo_url);
        if (geo_response.data.length > 0){
            lat = geo_response.data[0].lat;
            lon = geo_response.data[0].lon;
        } else{
          console.error('Error fetching data');
          return;
        }
      }
      catch(error){
        console.error('Error fetching data', error);
        return;
      }
    }
      try{
        const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5517fadcca0ae0eed1a332059c8f05b1`
        const weather_response = await axios.get(weather_url);
        setData(weather_response.data)
      } catch(error){
        console.error('No data for specified location')
      }
      setLocation('');
  };
  


  return (
    <div className="app">
    <div class="top-contain">
      <div className="search">
        <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder='Enter city'
        type="text"
        />
         <LocationButton className="locate" onClick={handleLocationClick}/>
      </div>
      </div>
      <button className="enter_button" onClick={() => searchLocation()}>
      Search
    </button>
        <div className="container">
          <div className="top">
            <div className="location">
            <h1>{data.name}</h1>
            </div>
            <div className="temp">
            <p>{data.main? `${kelvintoFahrenheit(data.main.temp)}°F` : ''}</p>
            </div>
            
            <div className= "icon">
              {data.weather ? <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt= "Weather icon"
              /> : null}
            </div>
            <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
        </div>
        <div className="bottom">
          <div className="feels">
          <p>Feels</p>
          <p className='bold'> 
      {data.main ? `${kelvintoFahrenheit(data.main.feels_like)}°F` : ''}
      </p>
          </div>
          <div className="humidity">
          <p>Humidity</p>
          {data.main ? <p className='bold'>{data.main.humidity}%</p>: null}
          </div>
          <div className="wind">
          <p>Wind Speed</p>
          {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p>: null}
          </div>
        </div>     
      </div>
    </div>
);
}
export default App;
