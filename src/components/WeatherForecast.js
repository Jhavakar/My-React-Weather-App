import React, { useState, useEffect, useRef } from "react";
import "./weatherforecast.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function WeatherForecast({ forecastData }) {
  const [isSliderActive, setIsSliderActive] = useState(false);

  const sliderRef = useRef();

  const initSlider = () => {
    // Your slider initialization logic here
    setIsSliderActive(true);
  };

  const destroySlider = () => {
    // Your slider destruction logic here
    setIsSliderActive(false);
  };

  useEffect(() => {
    const checkWindowSize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768 && !isSliderActive) {
        initSlider();
      } else if (windowWidth >= 768 && isSliderActive) {
        destroySlider();
      }
    };

    checkWindowSize();

    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, [isSliderActive]);

  if (!Array.isArray(forecastData)) {
    return <p>Forecast data is not available.</p>;
  }

  const groupForecastByDay = (data) => {
    const groupedData = {};
    data.forEach((item) => {

      const date = new Date(item.dt * 1000);
      const dateString = date.toISOString().split("T")[0];

      if (!groupedData[dateString]) {
        groupedData[dateString] = [];
      }
      groupedData[dateString].push(item);
    });
    return groupedData;
  };

  const dailyForecast = groupForecastByDay(forecastData);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const forecastSlides = Object.keys(dailyForecast).map((dateString, index) => {
    const dayData = dailyForecast[dateString];
    const avgTemp =
      dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length;
    const iconCode =
      dayData[0].weather && dayData[0].weather.length > 0
        ? dayData[0].weather[0].icon
        : null;
    const iconUrl = iconCode
      ? `http://openweathermap.org/img/wn/${iconCode}.png`
      : null;

    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const dayLabel = isToday
      ? "Today"
      : date.toLocaleDateString("en-US", { weekday: "short" });

      if (isToday) {
        // Skip this iteration if it's today
        return null;
      }

    return (
      <div className="forecast-day" key={index}>
        <h3>{dayLabel}</h3>
        <img
          className="weather-icon"
          src={iconUrl}
          alt={dayData[0].weather[0].main}
        />
        <p>{Math.round(avgTemp - 273.15)}°C</p>
      </div>
    );
  });

  return (
    <div className="weather-forecast" ref={sliderRef}>
      {isSliderActive ? (
        <Slider {...settings}>{forecastSlides}</Slider>
      ) : (
        <div className="weather-forecast">{forecastSlides}</div>
      )}
    </div>
  );
}

export default WeatherForecast;
