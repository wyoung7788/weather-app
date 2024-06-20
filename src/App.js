import "./App.css"
import { fetchWeatherApi } from 'openmeteo';
import Search from "./components/search/search";
import React, {useState, useEffect} from 'react';

function App(){

  // responses: holds current state, weather data
  // setResponses: update responses state
  const [responses, setResponses] = useState(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      const url = "https://api.open-meteo.com/v1/forecast";
      const params = {
        "latitude": 52.52,
        "longitude": 13.41,
        "hourly": "temperature_2m"
      };
      try{
        const responses = await fetchWeather(url, params);
        setResponses(responses);
      }
      catch(error){
        console.error("Error fetching weather.");
      }
    };

    fetchWeather();
  }, []);
  return (
    <div className="app">
      <div className="search">
        <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder='Enter location'
        />
      </div>
    <div className="container">
      <div className="top">
        <div className="location">
          <p>Dallas</p>
        </div>
        <div className="temp">
          <h1>60F</h1>
        </div>
        <div className="description">
          <p>Clouds</p>
        </div>
      </div>
      <div className="bottom"></div>
      <Search />
    </div>
    </div>
  );
}
export default App;
