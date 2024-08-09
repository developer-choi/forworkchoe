import {ComponentPropsWithoutRef} from 'react';
import styles from './body.module.scss';
import classNames from 'classnames';

export default function DefaultModalBody({className, ...rest}: ComponentPropsWithoutRef<'span'>) {
  return (
    <span className={classNames(styles.body, className)} {...rest}/>
  );
}
