import classNames from 'classnames';
import styles from './index.module.scss';
import type {ComponentPropsWithoutRef} from 'react';

export default function Button({className, ...rest}: ComponentPropsWithoutRef<'button'>) {
  return (
    <button type="button" className={classNames(styles.button, className)} {...rest}/>
  );
}
