import React, { useState } from 'react';
import './index.css';
// Import images
import searchIcon from './images/search.png';
import cloudsIcon from './images/clouds.png';
import clearIcon from './images/clear.png';
import rainIcon from './images/rain.png';
import drizzleIcon from './images/drizzle.png';
import mistIcon from './images/mist.png';
import humidityIcon from './images/humidity.png';
import windIcon from './images/wind.png';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const apikey = "25816bee71661fd4bd206449947af3cf";
  const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

  const searchWeather = async () => {
    try {
      const response = await fetch(`${apiurl}${city}&appid=${apikey}`);

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
    }
  };

  // Function to get the correct weather icon path
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
          return "";
      }
    }
    return "";
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
        <button onClick={searchWeather}><img src={searchIcon} alt="" /></button>
      </div>

      {notFound && <div className="notfound"><p>Invalid city name</p></div>}

      {weatherData && (
        <div className="second">
          <img
            className="Weather-icons"
            src={getWeatherIcon(weatherData.weather)}
            alt="Weather Icon"
          />
          <h1 className="temp">{weatherData.main?.temp && Math.round(weatherData.main.temp)}°C</h1>
          <h2 className="city">{weatherData.name}</h2>

          <div className="third">
            <div className="third1">
              <img src={humidityIcon} alt="" />
              <div>
                <p className="humidity">{weatherData.main?.humidity}%</p>
                <p>humidity</p>
              </div>
            </div>
            <div className="third1">
              <img src={windIcon} alt="" />
              <div>
                <p className="wind">{weatherData.wind?.speed} km/h</p>
                <p>Wind speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
