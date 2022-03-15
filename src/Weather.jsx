import React, { useState, useEffect } from 'react';
import useFetch from './components/useFetch.hook';
import SearchCityForm from './components/SearchCityForm/SearchCityForm';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [validation, setValidation] = useState('');
  const { get, loading } = useFetch('http://api.openweathermap.org/data/2.5/');

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  function handleCityChange(e) {
    setCity(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!city) {
      setValidation('Please, enter the city');
      return;
    }

    const API_KEY = '73b04f10a5d603d29c52ac0a00cc5625';

    get(`weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((data) => {
        if (data) {
          console.log('🚀 ~ file: Weather.jsx ~ line 25 ~ .then ~ data', data);
          console.log(data.name);
          setWeatherData([
            ...weatherData,
            {
              cityName: data.name,
              cityTemperature: Math.round(data.main.temp),
              icon: data.weather[0].icon,
              feelsLike: Math.round(data.main.feels_like),
              weather: data.weather[0].main,
              sunrise: data.sys.sunrise,
              sunset: data.sys.sunset,
            },
          ]);
        }
      })
      .catch((error) => console.log(error));
    setCity('');
  }

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="search">
            <SearchCityForm
              onFormSubmit={handleFormSubmit}
              city={city}
              onCityChange={handleCityChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
