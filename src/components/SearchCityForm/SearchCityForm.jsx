import React, { useRef, useEffect } from 'react';

import clsx from 'clsx';
import styles from './SearchCityForm.module.scss';
import image from '../../img/search-icon.svg';

export default function SearchCityForm(props) {
  const { onFormSubmit, city, onCityChange, validation } = props;
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const classes = clsx(styles.form__input, {
    [styles.error]: validation !== '',
  });

  return (
    <form className={styles.form} action="#" onSubmit={onFormSubmit}>
      <input
        className={classes}
        type="text"
        name="city"
        placeholder="Search a new city..."
        value={city}
        onChange={onCityChange}
        ref={inputRef}
      />
      <button className={styles.form__button} type="submit">
        <img className={styles.form__img} src={image} alt="search icon" />
      </button>
    </form>
  );
}
