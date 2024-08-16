import React, { ComponentPropsWithRef, forwardRef, Ref } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import IcCheck from '@/components/icon/IcCheck';
import IcUncheck from '@/components/icon/IcUncheck';

export interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label?: string;
  color?: 'primary' | 'secondary';
}

export default forwardRef(function Checkbox(props: CheckboxProps, ref: Ref<HTMLInputElement>) {
  const { style, className, label, color = 'primary', ...rest } = props;

  return (
    <label style={style} className={classNames(styles.wrapper, styles[color], className)}>
      <IcCheck className={styles.checked}/>
      <IcUncheck className={styles.unchecked}/>
      <input ref={ref} type="checkbox" {...rest} />
      {label}
    </label>
  );
});
