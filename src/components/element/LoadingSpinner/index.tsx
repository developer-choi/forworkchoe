import {ComponentPropsWithRef} from "react";
import styles from './index.module.scss';
import classNames from 'classnames';

// 기본 크기는 50x50에 실제 스피너 돌아가는 부분은 20x20임.
interface SpinnerProps extends ComponentPropsWithRef<"svg"> {
  strokeWidth?: number; // default 5
  stroke?: string;
  square?: number;
}

export default function LoadingSpinner({square = 20, strokeWidth = 3, stroke = 'black', className, ...rest}: SpinnerProps) {
  return (
    <svg viewBox={`0 0 ${square} ${square}`} width={square} height={square} className={classNames(className, styles.svg)} {...rest}>
      <circle cx={square / 2} cy={square / 2} r={(square / 2) - (strokeWidth / 2)} fill="none" stroke={stroke} strokeWidth={strokeWidth}></circle>
    </svg>
  );
}
