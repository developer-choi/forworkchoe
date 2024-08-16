import {ComponentPropsWithRef} from "react";
import {keyframes, styled} from "styled-components";

// 기본 크기는 50x50에 실제 스피너 돌아가는 부분은 20x20임.
interface SpinnerProps extends ComponentPropsWithRef<"svg"> {
  strokeWidth?: number; // default 5
  stroke?: string;
  square?: number;
}

export default function LoadingSpinner({square = 20, strokeWidth = 3, stroke = 'black', ...rest}: SpinnerProps) {
  return (
    <Svg viewBox={`0 0 ${square} ${square}`} width={square} height={square} {...rest}>
      <circle cx={square/2} cy={square/2} r={(square/2) - (strokeWidth/2)} fill="none" stroke={stroke} strokeWidth={strokeWidth}></circle>
    </Svg>
  )
}

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const Svg = styled.svg`
  > circle {
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
  }
`;
