import React, { useState, useEffect } from 'react';

import styles from './DateComponent.module.scss';

export default function DateComponent() {
  const [date, setDate] = useState(new Date());

  function handleWindowLoad() {
    setDate(new Date());
  }

  useEffect(() => {
    window.addEventListener('load', handleWindowLoad);

    return () => {
      window.removeEventListener('load', handleWindowLoad);
    };
  });

  const now = () => {
    const months = [
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
    return `${
      months[date.getMonth()]
    }, ${date.getDate()} ${date.getFullYear()}`;
  };

  return <div className={styles.search__date}>{now()}</div>;
}
