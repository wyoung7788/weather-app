import axios from 'axios';
import React, {useState} from 'react';
import LocationButton from './LocationButton';


function App(){
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const kelvintoFahrenheit = (k) => ((k-273.15)*9/5 + 32).toFixed(0);


  const success = async (position) =>{
      const {lat, lon}= position.coords;
      const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5517fadcca0ae0eed1a332059c8f05b1`
      
      try{
      const weather_response = await axios.get(weather_url);
      setData(weather_response.data);
      } catch (error) {
        console.error('Error fetching data');
      }
  };
  const error = () => {
    console.error('Unable to retrieve your location');
  };

  function handleLocationClick(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error);
    }
    else{
      console.log("Geolocation not supported");
    }
  }

  const searchLocation = async () =>{

      // convert inputted "San Diego" to coordinates 
      //(and then load onto screen)
      // take coordinates to call url to get weather details
      const geo_url= `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=5517fadcca0ae0eed1a332059c8f05b1`

      try{
        const geo_response = await axios.get(geo_url);
        if (geo_response.data.length > 0){
        const {lat, lon} = geo_response.data[0];

        const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5517fadcca0ae0eed1a332059c8f05b1`
        const weather_response = await axios.get(weather_url);
        setData(weather_response.data)
      } else{
        console.error('No data for specified location')
      }
    }
    catch(error){
      console.error('Error fetching data', error);
    }
      setLocation('')
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
      <button className="enter_button" onClick={searchLocation}>
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
