import {ReactNode, PropsWithChildren, CSSProperties} from "react";
import classNames from 'classnames';
import styles from './index.module.scss';

export interface FormElementWrapperProps {
  label?: string | ReactNode;
  error?: string;

  className?: string;
  style?: CSSProperties;
}

/**
 * input, textarea, radio-group, select 만들 때
 * label, error를 매번 각 컴포넌트에서 조건문넣어서 렌더링시키지말고
 * 그냥 wrapper 하나에서 다 시키는게 훨씬 낫고, 강제시킬 수 있음.
 *
 * 폼 요소별로 (특히 input, textarea) 상태는 우선순위까지 결정이 필요함.
 * 네이버기준 disabled > error > focus > default임.
 */
export function FormElementWrapper({label, error, children, style, className = ''}: PropsWithChildren<FormElementWrapperProps>) {
  return (
    <div style={style} className={classNames(className)}>
      {!label ? null : <label className={styles.label}>{label}</label>}

      {children}

      {!error ? null : <span className={styles.formErrorMessage}>{error}</span>}
    </div>
  )
}
