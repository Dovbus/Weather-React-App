import styles from './WeatherForecast.module.scss';
import clsx from 'clsx';
import d01 from '../../img/animated/01d.svg';
import n01 from '../../img/animated/01n.svg';
import d02 from '../../img/animated/02d.svg';
import n02 from '../../img/animated/02n.svg';
import d03 from '../../img/animated/03d.svg';
import d09 from '../../img/animated/09d.svg';
import d10 from '../../img/animated/10d.svg';
import n10 from '../../img/animated/10n.svg';
import d11 from '../../img/animated/11d.svg';
import d13 from '../../img/animated/13d.svg';
import d50 from '../../img/animated/50d.svg';

function WeatherForecast(props) {
  const { city, forecastList } = props;
  const classes = clsx(styles.about__table, styles.first);

  function deleteZero(num) {
    if (num >= 0 && num <= 9) {
      return num.slice(1);
    }
    return num;
  }

  function changeFormatForecastDate(date) {
    if (!date) {
      return;
    }
    const months = [
      '',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const fullDate = date.slice(0, 10);
    const arr = fullDate.split('-');
    const month = deleteZero(arr[1]);
    const newFormatDate = `${arr[2]} ${months[month]}`;
    return newFormatDate;
  }

  function getImgUrl(data) {
    let imgUrl;
    switch (data) {
      case '01d':
        imgUrl = d01;
        break;
      case '01n':
        imgUrl = n01;
        break;
      case '02d':
        imgUrl = d02;
        break;
      case '02n':
        imgUrl = n02;
        break;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        imgUrl = d03;
        break;
      case '09d':
      case '09n':
        imgUrl = d09;
        break;
      case '10d':
        imgUrl = d10;
        break;
      case '10n':
        imgUrl = n10;
        break;
      case '11d':
      case '11n':
        imgUrl = d11;
        break;
      case '13d':
      case '13n':
        imgUrl = d13;
        break;
      case '50d':
      case '50n':
        imgUrl = d50;
        break;
    }
    return imgUrl;
  }

  return (
    <div className={styles.tab}>
      <h3 className={styles.tab__city}>{city}</h3>
      <div>
        {forecastList &&
          forecastList.map((data, index) => {
            return (
              <table className={styles.about__tables} key={index}>
                <tbody>
                  <tr>
                    <td className={classes}>
                      {changeFormatForecastDate(data.dt_txt)}
                    </td>
                    <td className={classes}>{data.dt_txt.slice(11, 16)}</td>
                  </tr>
                  <tr>
                    <td
                      className={styles.about__table}
                    >{`Temperature: ${Math.round(data.main.temp)}°`}</td>
                    <td className={styles.about__table}>
                      {data.weather[0].main}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={styles.about__table}
                    >{`Feels like: ${Math.round(data.main.feels_like)}°`}</td>
                    <td className={styles.about__table}>
                      <img
                        className={styles.tableImg}
                        src={getImgUrl(data.weather[0].icon)}
                        alt="weather icon"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
      </div>
    </div>
  );
}

export default WeatherForecast;
