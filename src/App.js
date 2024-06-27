import axios from 'axios';
import React, {useState} from 'react';

function App(){
  const [data, setData] = useState({})
  // parse through input to get location
  const [location, setLocation] = useState('');
  //const [coords, setCoords]= useState({ lat: '', lon:''});

  const searchLocation = async (event) =>{
    if (event.key === 'Enter'){
      //get location based on input
      const parts = location.split(',');

      /*
      if (parts.length === 2) {
        // If there is 1 comma, it's outside of the US
        query = `${parts[0].trim()},${parts[1].trim()}`;
      } else if (parts.length === 3) {
        // If there are 2 commas, it's in the US
        query = `${parts[0].trim()},${parts[1].trim()},${parts[2].trim()}`;
      } else {
        console.error('Invalid format. Please enter the location in the format: City, State Code (if US), Country Code.');
        return;
      }
        */
     //const geo_url= `https://api.openweathermap.org/geo/1.0/direct?q=Seattle,WA,USA&limit=1&appid=5517fadcca0ae0eed1a332059c8f05b1`
      /*
      try{
        const geoResponse = await axios.get(geo_url);
        if (geoResponse.data.length > 0){
          const {lat, lon} = geoResponse.data[0];
          //setCoords({ lat, lon });
        */
        // get weather details 
        try{
        const weather_url = `https://api.openweathermap.org/data/3.0/onecall?lat=32.715736&lon=-117.161087&exclude=minutely,hourly&appid=5517fadcca0ae0eed1a332059c8f05b1`
        const weatherResponse = await axios.get(weather_url);
        
        setData(weatherResponse.data);
        console.log(weatherResponse.data);
      } //else{
        //console.error("Location not found");
      
    catch (error){
        console.error("Error fetching data:", error);
      }
      setLocation('');
  
    }
}
  return (
    <div className="app">
    <div className= "label">
        Format: New York, NY, USA
      </div>
      <div className="label">
        If city is in the US, please enter the State Code
      </div>
      <div className="search">
        <input
        value="SanDiego"
        //take in city name, backend to convert to coordinates
        onChange={(event) => setLocation(event.target.value)}
        //onKeyDown={searchLocation}
        placeholder='Enter city'
        type="text"
        />
        </div>
        </div>
);

  }
export default App;
