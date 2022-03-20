import styles from './WeatherDetails.module.scss';

function WeatherDetails(props) {
  const { weatherData } = props;

  function addZerro(num) {
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
    const hour = addZerro(date.getHours());
    const min = addZerro(date.getMinutes());
    return `${hour}:${min}`;
  }

  return (
    <div className={styles.tab}>
      <h3 className={styles.tab__city}>{weatherData.cityName}</h3>
      <ul className={styles.tab__cityList}>
        <li className={styles.tab__cityItem}>
          <span>Temperature: {weatherData.cityTemperature}°</span>
        </li>
        <li className={styles.tab__cityItem}>
          <span>Feels like: {weatherData.feelsLike}°</span>
        </li>
        <li className={styles.tab__cityItem}>
          <span>Weather: {weatherData.weather}</span>
        </li>
        <li className={styles.tab__cityItem}>
          <span>Sunrise: {changeDetailsDateFormat(weatherData.sunrise)}</span>
        </li>
        <li className={styles.tab__cityItem}>
          <span>Sunset: {changeDetailsDateFormat(weatherData.sunset)}</span>
        </li>
      </ul>
    </div>
  );
}

export default WeatherDetails;
