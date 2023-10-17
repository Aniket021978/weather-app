import React, { useState } from 'react';
import './next.css';

import searchIcon from './images/search.png';
import cloudsIcon from './images/clouds.png';
import clearIcon from './images/clear.png';
import rainIcon from './images/rain.png';
import drizzleIcon from './images/drizzle.png';
import mistIcon from './images/mist.png';

const Next = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const apikey = "25816bee71661fd4bd206449947af3cf";
  const apiurl = "https://api.openweathermap.org/data/2.5/forecast?q=";

  const searchWeather = async () => {
    try {
      const response = await fetch(`${apiurl}${city}&units=metric&cnt=7&appid=${apikey}`);
      console.log('Response status:', response.status);

      if (response.status === 404) {
        setNotFound(true);
        setWeatherData(null);
      } else {
        const data = await response.json();
        console.log('Weather data:', data);
        setWeatherData(data);
        setNotFound(false);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setNotFound(true);
      setWeatherData(null);
    }
  };

  const getWeatherIcon = (weatherArray) => {
    if (weatherArray && weatherArray.length > 0) {
      const weatherMain = weatherArray[0].main;
      switch (weatherMain) {
        case "Clouds":
          return cloudsIcon;
        case "Clear":
          return clearIcon;
        case "Rain":
          return rainIcon;
        case "Drizzle":
          return drizzleIcon;
        case "Mist":
          return mistIcon;
        default:
          return cloudsIcon; // Replace with your default icon
      }
    }
    return cloudsIcon; // Replace with your default icon
  };

  return (
    <div className="main">
      <div className="first">
        <input
          type="text"
          placeholder="Enter city"
          spellCheck="false"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={searchWeather}>Search</button>
      </div>

      {notFound && <div className="notfound">Invalid city name</div>}

      {weatherData && weatherData.list && weatherData.list.length > 0 && (
        <div>
          <div className="current-weather">
            <h2>Current Weather</h2>
            <div className="current-weather-info">
              <img
                src={getWeatherIcon(weatherData.list[0].weather)}
                alt={weatherData.list[0].weather[0]?.description || 'Description N/A'}
              />
              <p class="degree">{Math.round(weatherData.list[0].main?.temp || 0)}°C</p>
              <p class="des">{weatherData.list[0].weather[0]?.description || 'Description N/A'}</p>
            </div>
          </div>

          <div className="forecast">
            <h2>7-Day Forecast</h2>
            <div className="forecast-items">
              {weatherData.list.slice(1, 8).map((forecast, index) => (
                <div key={index} className="forecast-item">
                  <p>{forecast.dt ? new Date(forecast.dt * 1000).toLocaleDateString() : 'Date N/A'}</p>
                  <img
                    src={
                      forecast.weather &&
                      forecast.weather[0] &&
                      forecast.weather[0].icon &&
                      getWeatherIcon(forecast.weather)
                    }
                    alt={
                      forecast.weather &&
                      forecast.weather[0] &&
                      forecast.weather[0].description
                        ? forecast.weather[0].description
                        : 'Description N/A'
                    }
                  />
                  <p>
                    {forecast.main && forecast.main.temp ? Math.round(forecast.main.temp) + '°C' : 'Temperature N/A'}
                  </p>
                  <p>
                    {forecast.weather &&
                    forecast.weather[0] &&
                    forecast.weather[0].description
                      ? forecast.weather[0].description
                      : 'Description N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Next;
