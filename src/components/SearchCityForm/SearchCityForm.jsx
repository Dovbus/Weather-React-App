import React from 'react';
import styles from './SearchCityForm.module.scss';
import image from '../../img/search-icon.svg';

export default function SearchCityForm(props) {
  const { onFormSubmit, city, onCityChange } = props;
  return (
    <form className={styles.form} action="#" onSubmit={onFormSubmit}>
      <input
        className={styles.form__input}
        type="text"
        name="city"
        placeholder="Search a new city..."
        value={city}
        onChange={onCityChange}
      />
      <button className={styles.form__button} type="submit">
        <img src={image} alt="search icon" />
      </button>
    </form>
  );
}
