import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

import styles from './WeatherGeneralInfo.module.scss';
import CloudSvg from '../../img/cloud-forecast.svg';
import d01 from '../../img/nows/01d.svg';
import n01 from '../../img/nows/01n.svg';
import d02 from '../../img/nows/02d.svg';
import n02 from '../../img/nows/02n.svg';
import d03 from '../../img/nows/03d.svg';
import d04 from '../../img/nows/04d.svg';
import d09 from '../../img/nows/09d.svg';
import d10 from '../../img/nows/10d.svg';
import n10 from '../../img/nows/10n.svg';
import d11 from '../../img/nows/11d.svg';
import d13 from '../../img/nows/13d.svg';
import d50 from '../../img/nows/50d.svg';

function WeatherGeneralInfo(props) {
  const { onFavoriteAdd, heartIcon } = props;
  const context = useContext(AppContext);

  function chooseImgSrc(data) {
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
        imgUrl = d03;
        break;
      case '04d':
      case '04n':
        imgUrl = d04;
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
      default:
        imgUrl = CloudSvg;
    }
    return imgUrl;
  }

  return (
    <div className={styles.tab}>
      <div className={styles.item__column}>
        <div className={styles.item__degrees}>
          <h2 className={styles.degrees}>
            {context.weatherData.cityTemperature
              ? `${context.weatherData.cityTemperature}°`
              : '14°'}
          </h2>
        </div>
        <div className={styles.item__weather}>
          <img
            className={styles.cloud}
            src={chooseImgSrc(context.weatherData.icon)}
            alt="icon-cloud"
          />
        </div>
        <div className={styles.itemRow}>
          <p className={styles.itemRow__text}>
            {context.weatherData.cityName
              ? context.weatherData.cityName
              : 'Unknown'}
          </p>
          <button className={styles.likedButton} onClick={onFavoriteAdd}>
            <img
              className={styles.itemRow__img}
              src={heartIcon}
              alt="heart icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WeatherGeneralInfo;
