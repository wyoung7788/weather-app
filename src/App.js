import axios from 'axios';
import React, {useState} from 'react';

function App(){
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const kelvintoFahrenheit = (k) => ((k-273.15)*9/5 + 32).toFixed(0);

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
      <div className="search">
        <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder='Enter city'
        type="text"
        />
      </div>
      <button className="enter_button" onClick={searchLocation}>
      Search
    </button>
        <div className="container">
          <div className="top">
            <div className="location">
            <p>{data.name}</p>
            </div>
            <div className="temp">
            <p>{data.main? `${kelvintoFahrenheit(data.main.temp)}°F` : ''}</p>
            </div>
            <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
        
        <div className="bottom">
          <div className="feels">
          <p>{data.main? `${kelvintoFahrenheit(data.main.feels_like)}°F` : ''}</p>
            <p>Feels like</p>
          </div>
          <div className="humidity">
          {data.main ? <p className='bold'>{data.main.humidity}%</p>: null}
            <p>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p>: null}
            <p>Wind Speed</p>
          </div>
        </div>     
        </div>
        </div>
);
}
export default App;
