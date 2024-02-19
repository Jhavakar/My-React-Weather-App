import React, { useState } from "react";
import axios from "axios";
import DisplayWeather from "./DisplayWeather";
import WeatherForecast from "./WeatherForecast";
import WeatherMap from "./WeatherMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState(null); // Change this to null initially
  const [forecast, setForecast] = useState(null); // State to store forecast data
  const [form, setForm] = useState({ city: "" });
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const APIKEY = "API_KEY";

  const weatherData = async (e) => {
    e.preventDefault();
    if (form.city === "") {
      // alert("Enter a city name");
      setErrorMessage("Please enter a city name.");
    } else {
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${APIKEY}`,
        );
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${form.city}&appid=${APIKEY}`,
        );
        const forecastData = await forecastResponse.json();
        setForecast(forecastData.list);

        setForm({ city: "" });
        setCitySuggestions([]);
        setShowSearch(false);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  };

  const fetchCitySuggestions = async (searchTerm) => {
    if (searchTerm.length > 2) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${searchTerm}&appid=${APIKEY}&type=like&sort=population&cnt=5`,
        );
        const suggestions = response.data.list.map(
          (city) => `${city.name}, ${city.sys.country}`,
        );
        setCitySuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
        setCitySuggestions([]);
      }
    } else {
      setCitySuggestions([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city") {
      setForm({ ...form, city: value });
      fetchCitySuggestions(value);
    }
  };

  const handleSuggestionClick = (city) => {
    setForm({ city });
    setCitySuggestions([]); 
  };

  const toggleSearchBar = () => {
    setShowSearch(!showSearch);
  };

  const handleBlur = () => {
    if (!form.city) {
      setShowSearch(false);
    }
  };

  return (
    <div className="weather">
      <h2 className="title">Weather App</h2>
      <br />
      <div className="search-input-container">
        {!showSearch && (
          <FontAwesomeIcon
            icon={faSearch}
            onClick={toggleSearchBar}
            className="search-icon"
          />
        )}
        {showSearch && (
          <form onSubmit={weatherData} className="search-form">
            <input
              type="text"
              name="city"
              placeholder="Enter City Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.city}
              className="search-input"
            />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </button>
            <div className="error-message">{errorMessage}</div>
          </form>
        )}
      </div>
      {citySuggestions.length > 0 && (
        <div className="citysuggestionsdropdown">
          {citySuggestions.map((city, index) => (
            <div
              key={index}
              className="city-suggestion"
              onClick={() => handleSuggestionClick(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
      {weather && <DisplayWeather data={weather} />}
      {forecast && <WeatherForecast forecastData={forecast || []} />}
      {weather && weather.coord && (
        <WeatherMap location={[weather.coord.lat, weather.coord.lon]} />
      )}{" "}
    </div>
  );
}

export default Weather;
