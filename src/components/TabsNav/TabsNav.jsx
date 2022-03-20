import React, { useState } from 'react';
import styles from './TabsNav.module.scss';
import clsx from 'clsx';

function TabsNav(props) {
  const { currentPage, onShowPage, onForecast } = props;

  function handleForecastClick() {
    onShowPage('Forecast');
    onForecast();
  }

  return (
    <div className={styles.tabs__nav}>
      <button
        className={clsx(styles.tabsNav__item, {
          [styles.isActive]: currentPage === 'Nows',
        })}
        onClick={() => onShowPage('Nows')}
      >
        Nows
      </button>
      <button
        className={clsx(styles.tabsNav__item, {
          [styles.isActive]: currentPage === 'Details',
        })}
        onClick={() => onShowPage('Details')}
      >
        Details
      </button>
      <button
        className={clsx(styles.tabsNav__item, {
          [styles.isActive]: currentPage === 'Forecast',
        })}
        onClick={handleForecastClick}
      >
        Forecast
      </button>
    </div>
  );
}

export default TabsNav;
