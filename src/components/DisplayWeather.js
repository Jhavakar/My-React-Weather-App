import React from "react";
import "./displayweather.css";
import Clock from "./Clock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerHalf,
  faTint,
  faWind,
  faSun,
  faMoon,
  faEye,
  faTachometerAlt,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";


function DisplayWeather({ data }) {
  // Early return for missing data or city not found
  if (!data) {
    console.error("Weather data is missing or undefined.");
    return <div className="error">Weather data is not available.</div>;
  }

  if (data.cod === "404") {
    return <div className="error">City not found. Please check the city.</div>;
  }

  const iconUrl =
    data.weather && data.weather[0].icon
      ? `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      : null;

  const country = data.sys.country || "Unknown";
  const temp = Math.floor(data.main.temp - 273.15);
  const tempMax = Math.floor(data.main.temp_max - 273.15);
  const tempMin = Math.floor(data.main.temp_min - 273.15);

  return (
    <div className="displayweather">
      <div className="maincard">
    <div className="weather-icon-container">
    <div className="location-container">
      <h1 className="cardtitle">
        {data.name}, {country}
      </h1>
      <span className="cardsubtitle">
        <Clock timezoneOffset={data.timezone} />
      </span>
    </div>
      <img
        className="weather-icon"
        src={iconUrl}
        alt={data.weather[0].main}
      />
    </div>
    <div className="temp-container">
      <h1>
        {temp}<sup className="sup">°C</sup>
      </h1>
    </div>
    <span className="weather-main">{data.weather[0].description}</span>

  </div>
      {/* Weather details section */}
      <div className="weatherdetails">
        <div className="section1">
          <table>
            <tbody>
              <tr>
                <td>
                  <h4>
                    <FontAwesomeIcon icon={faThermometerHalf} /> High / Low
                  </h4>
                </td>
                <td>
                  <span>
                    {tempMax}°C / {tempMin}°C
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>
                    <FontAwesomeIcon icon={faTint} /> Humidity
                  </h4>
                </td>
                <td>
                  <span>{data.main.humidity} %</span>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>
                    <FontAwesomeIcon icon={faTachometerAlt} /> Pressure
                  </h4>
                </td>
                <td>
                  <span>{data.main.pressure} hPa</span>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>
                    <FontAwesomeIcon icon={faEye} /> Visibility
                  </h4>
                </td>
                <td>
                  <span>
                    {((data.visibility / 1000) * 0.621371).toFixed(2)} mi
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="section2">
          <table>
            <tbody>
              <tr>
                <td>
                  <h4>
                    <FontAwesomeIcon icon={faWind} /> Wind
                  </h4>
                </td>
                <td>
                  <span>{(data.wind.speed * 0.621371).toFixed(2)} MPH</span>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>
                    <FontAwesomeIcon icon={faThermometerHalf} /> Feels Like
                  </h4>
                </td>
                <td>
                  <span>
                    {data.main.feels_like
                      ? Math.floor(data.main.feels_like - 273.15)
                      : "N/A"}
                    °C
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>
                    <FontAwesomeIcon icon={faSun} /> Sunrise
                  </h4>
                </td>
                <td>
                  <span>
                    {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>
                    <FontAwesomeIcon icon={faMoon} /> Sunset
                  </h4>
                </td>
                <td>
                  <span>
                    {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2>
          <FontAwesomeIcon icon={faCalendarDays} />
          5-DAY FORECAST
        </h2>
      </div>
    </div>
  );
}

export default DisplayWeather;
