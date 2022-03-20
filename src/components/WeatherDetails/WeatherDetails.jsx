import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

import styles from './WeatherDetails.module.scss';

function WeatherDetails() {
  const context = useContext(AppContext);

  function addZero(num) {
    if (num >= 0 && num <= 9) {
      return `0${num}`;
    }
    return num;
  }

  function changeDetailsDateFormat(time) {
    if (!time) {
      return;
    }
    const date = new Date(time * 1000);
    const hour = addZero(date.getHours());
    const min = addZero(date.getMinutes());
    return `${hour}:${min}`;
  }

  return (
    <div className={styles.tab}>
      <h3 className={styles.tab__city}>{context.weatherData.cityName}</h3>
      <ul className={styles.tab__cityList}>
        <li className={styles.tab__cityItem}>
          <span>Temperature: {context.weatherData.cityTemperature}°</span>
        </li>
        <li className={styles.tab__cityItem}>
          <span>Feels like: {context.weatherData.feelsLike}°</span>
        </li>
        <li className={styles.tab__cityItem}>
          <span>Weather: {context.weatherData.weather}</span>
        </li>
        <li className={styles.tab__cityItem}>
          <span>
            Sunrise: {changeDetailsDateFormat(context.weatherData.sunrise)}
          </span>
        </li>
        <li className={styles.tab__cityItem}>
          <span>
            Sunset: {changeDetailsDateFormat(context.weatherData.sunset)}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default WeatherDetails;
