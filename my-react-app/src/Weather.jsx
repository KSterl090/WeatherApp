import { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setError("");
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch {
      setError("City not found. Try again.");
    }
  };

  {
    /*Text Animation Logic*/
  }
  const getTempClass = (temp) => {
    if (temp === undefined || temp === null) return "";

    if (temp >= 30) return "hot-animate";
    if (temp <= 10) return "cold-animate";
    if (temp > 10 && temp < 20) return "rain-animate";
    return "mild-animate";
  };

  {
    /* Contains everything*/
  }
  return (
    <div className="container">
      {" "}
      {/*<h2 className="text-primary">Weather App</h2>*/}
      <h2 className={`text-primary ${getTempClass(weather?.main?.temp)}`}>
        Weather App
      </h2>
      <div className="input-contain">
        <input
          className="form-control"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn" onClick={fetchWeather}>
          Get Weather
        </button>
      </div>
      <div className="result-contain">
        {error && <p className="error">{error}</p>}
        {weather && (
          <div className="weather-info">
            <h3>{weather.name}</h3>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
