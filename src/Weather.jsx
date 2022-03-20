import React, { useState, useEffect, useRef } from 'react';
import useFetch from './components/useFetch.hook';
import SearchCityForm from './components/SearchCityForm/SearchCityForm';
import DateComponent from './components/DateComponent/DateComponent';
import WeatherGeneralInfo from './components/WeatherGeneralInfo/WeatherGeneralInfo';
import AddedLocations from './components/AddedLocations/AddedLocations';
import TabsNav from './components/TabsNav/TabsNav';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';

import HeartSvg from './img/heart-icon.svg';
import LikedSvg from './img/heart-icon-liked.svg';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [validation, setValidation] = useState('');
  const { get, loading } = useFetch('http://api.openweathermap.org/data/2.5/');
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem('favoriteCities')) ?? []
  );
  const [currentPage, setCurrentPage] = useState('Nows');
  const [forecastList, setForecastList] = useState([]);
  const [imgUrl, setImgUrl] = useState(HeartSvg);
  const API_KEY = '73b04f10a5d603d29c52ac0a00cc5625';

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  useEffect(() => {
    console.log(forecastList);
  }, [forecastList]);

  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
  }, [favorites]);

  function handleCityChange(e) {
    setCity(e.target.value);
  }

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

  function fetchWeatherForecast() {
    get(`forecast?q=${city}&appid=${API_KEY}&units=metric`)
      .then((data) => {
        if (data) {
          console.log(data.list);
          setForecastList(data.list);
        }
      })
      .catch((error) => console.log(error));
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!city) {
      setValidation('Please, enter the city');
      return;
    }

    fetchCityWeather(city);
    setImgUrl(HeartSvg);
  }

  function handleFavoriteAdd() {
    if (!weatherData.cityName) {
      return;
    }
    const isFavorite =
      favorites.find(
        (favorite) => favorite.cityName === weatherData.cityName
      ) !== undefined;
    if (!isFavorite) {
      setFavorites([
        ...favorites,
        {
          id: Math.random(),
          cityName: weatherData.cityName,
        },
      ]);
    }
    setImgUrl(LikedSvg);
  }

  function handleDeleteClick(id) {
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  }

  function handleForecastClick() {
    console.log(city);

    if (!city) {
      return;
    }
    fetchWeatherForecast();
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
            <DateComponent />
          </div>
          <div className="inner">
            <div className="columns__item">
              <div className="tabs">
                <div className="tabs__content">
                  {currentPage === 'Nows' && (
                    <WeatherGeneralInfo
                      city={city}
                      weatherData={weatherData}
                      onFavoriteAdd={handleFavoriteAdd}
                      heartIcon={imgUrl}
                      favorites={favorites}
                    />
                  )}
                </div>
                {currentPage === 'Details' && (
                  <WeatherDetails weatherData={weatherData} />
                )}
                {currentPage === 'Forecast' && (
                  <WeatherForecast
                    city={city}
                    forecastList={forecastList}
                    weatherData={weatherData}
                    onFetchForecast={fetchWeatherForecast}
                  />
                )}
              </div>
              <TabsNav
                currentPage={currentPage}
                onShowPage={setCurrentPage}
                onForecast={handleForecastClick}
              />
            </div>
            <AddedLocations
              city={city}
              onCityChange={setCity}
              favorites={favorites}
              onDelete={handleDeleteClick}
              onFetch={fetchCityWeather}
            />
          </div>
        </div>
      </div>
    </>
  );
}
