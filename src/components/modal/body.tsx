import {ComponentPropsWithoutRef} from 'react';
import styles from './body.module.scss';
import classNames from 'classnames';

export default function DefaultModalBody({className, children, ...rest}: ComponentPropsWithoutRef<'span'>) {
  return (
    <span className={classNames(styles.bodyPaddingContainer, "bodyPaddingContainer", className)} {...rest}>
      <span className={classNames(styles.bodyScrollContainer, "bodyScrollContainer")}>{children}</span>
    </span>
  );
}
