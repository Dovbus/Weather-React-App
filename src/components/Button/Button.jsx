import clsx from 'clsx';
import styles from './Button.module.scss';

export default function Button(props) {
  const { className, type, children, disabled = false, ...rest } = props;
  const classes = clsx(styles.button, className);
  return (
    <button className={classes} type={type} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
