import React, {forwardRef, PropsWithChildren, Ref} from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import IcRadio from '@/components/icon/IcRadio';
import {CheckboxProps} from '@/components/form/Checkbox';
import {FormElementWrapper, FormElementWrapperProps} from '@/components/form/form-elements';

// 현재 디자인시스템에 맞게 디자인을 다시 수정한 컴포넌트이며, 차차 이 컴포넌트로 기존 <Radio 컴포넌트를 대체해 나가겠습니다.
export default forwardRef(function Radio(props: CheckboxProps, ref: Ref<HTMLInputElement>) {
  const {label, color = 'primary', style, ...rest} = props;

  return (
    <label style={style} className={classNames(styles.wrapper, styles[color])}>
      <IcRadio/>
      <input ref={ref} type="radio" {...rest} />
      {label}
    </label>
  );
});

export function RadioGroup(props: PropsWithChildren<FormElementWrapperProps>) {
  const { children, ...rest } = props;

  return (
    <FormElementWrapper {...rest}>
      <div className={styles.radioGroup}>{children}</div>
    </FormElementWrapper>
  );
}
