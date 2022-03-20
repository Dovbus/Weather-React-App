import React, { createContext, useState } from 'react';
import useFetch from './useFetch.hook';

const AppContext = createContext();

function AppProvider(props) {
  const [weatherData, setWeatherData] = useState({});
  const { get } = useFetch('http://api.openweathermap.org/data/2.5/');

  const API_KEY = '73b04f10a5d603d29c52ac0a00cc5625';

  function fetchCityWeather(value) {
    get(`weather?q=${value}&appid=${API_KEY}&units=metric`)
      .then((data) => {
        if (data) {
          setWeatherData({
            cityName: data.name,
            cityTemperature: Math.round(data.main.temp),
            icon: data.weather[0].icon,
            feelsLike: Math.round(data.main.feels_like),
            weather: data.weather[0].main,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
          });
        }
      })
      .catch((error) => console.log(error));
  }

  const value = {
    weatherData: weatherData,
    fetchCityWeather: fetchCityWeather,
    API_KEY: API_KEY,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };
