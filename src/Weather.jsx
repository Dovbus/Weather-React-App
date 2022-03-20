import React, { useState, useEffect, useContext } from 'react';
import { AppContext, AppProvider } from './components/AppContext';
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

function Weather() {
  const context = useContext(AppContext);
  const [city, setCity] = useState('');
  const [validation, setValidation] = useState('');
  const { get, loading } = useFetch('http://api.openweathermap.org/data/2.5/');
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem('favoriteCities')) ?? []
  );
  const [currentPage, setCurrentPage] = useState('Nows');
  const [forecastList, setForecastList] = useState([]);
  const [imgUrl, setImgUrl] = useState(HeartSvg);

  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
  }, [favorites]);

  function handleCityChange(e) {
    setCity(e.target.value);
  }

  function fetchWeatherForecast() {
    get(`forecast?q=${city}&appid=${context.API_KEY}&units=metric`)
      .then((data) => {
        if (data) {
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
    setValidation('');

    context.fetchCityWeather(city);
    setImgUrl(HeartSvg);
  }

  function handleFavoriteAdd() {
    if (!context.weatherData.cityName) {
      return;
    }
    const isFavorite =
      favorites.find(
        (favorite) => favorite.cityName === context.weatherData.cityName
      ) !== undefined;
    if (!isFavorite) {
      setFavorites([
        ...favorites,
        {
          id: Math.random(),
          cityName: context.weatherData.cityName,
        },
      ]);
    }
    setImgUrl(LikedSvg);
  }

  function handleDeleteClick(id) {
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  }

  function handleForecastClick() {
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
              validation={validation}
            />
            <DateComponent />
          </div>
          {validation && <div className="error">{validation}</div>}
          <div className="inner">
            <div className="columns__item">
              <div className="tabs">
                <div className="tabs__content">
                  {currentPage === 'Nows' && (
                    <WeatherGeneralInfo
                      city={city}
                      onFavoriteAdd={handleFavoriteAdd}
                      heartIcon={imgUrl}
                      favorites={favorites}
                    />
                  )}
                </div>
                {currentPage === 'Details' && <WeatherDetails />}
                {currentPage === 'Forecast' && (
                  <WeatherForecast
                    city={city}
                    forecastList={forecastList}
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
              onFetch={context.fetchCityWeather}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function AppWrapper() {
  return (
    <AppProvider>
      <Weather />
    </AppProvider>
  );
}

export default AppWrapper;
