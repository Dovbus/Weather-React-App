import styles from './AddedLocations.module.scss';
import clsx from 'clsx';

function AddedLocations(props) {
  const { onCityChange, onFetch, favorites, onDelete } = props;

  const classes = clsx(styles.location, styles.itemRightSide);
  const listClasses = clsx(styles.itemRightSide__bottom, styles.itemLocation);

  function handleFavoriteCityClick(value) {
    onCityChange(value);
    onFetch(value);
  }
  return (
    <div className={classes}>
      <div className={styles.itemRightSide__top}>
        <h4 className={styles.itemRightSide__title}>Added Locations:</h4>
      </div>
      <div className={listClasses}>
        <ul className={styles.itemLocation__list}>
          {favorites &&
            favorites.map((favorite) => {
              return (
                <li
                  key={favorite.id}
                  className={styles.itemLocation__link}
                  onClick={(value) =>
                    handleFavoriteCityClick(favorite.cityName)
                  }
                >
                  {favorite.cityName}
                  <input
                    className={styles.deleteButton}
                    type="button"
                    onClick={(id) => onDelete(favorite.id)}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default AddedLocations;
