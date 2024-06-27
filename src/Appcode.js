        /*
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
}}
}