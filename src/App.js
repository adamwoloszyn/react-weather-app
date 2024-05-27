import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const base_url = 'https://python-weather-dot-adam-workshop.uw.r.appspot.com';
      const response = await fetch(`${base_url}/get_weather_response?city=${encodeURIComponent(city)}`);
      const data = await response.json(); 

      if (data.cod !== 200) {
        throw new Error(data.message);
      }else {
        setWeather(data);
      }

    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      setWeather({ error: 'Failed to fetch weather data' });
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Get Weather Conditions</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="Enter City"
            aria-label="City"
          />
          <button type="submit">Get Weather</button>
        </form>
        {weather && (
          <div>
            {weather.error ? (
              <p>Error: {weather.error}</p>
            ) : (
              <div>
                <h2>Weather in {weather.name}</h2>
                <p>{weather.weather[0].description}</p>
                <p>Temperature: {weather.main.temp}°C</p>
                <p>Feels like: {weather.main.feels_like}°C</p>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
