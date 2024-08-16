import {styled, css} from "styled-components";
import {ReactNode, PropsWithChildren, CSSProperties} from "react";
import {THEME} from '@/util/style/style';

export interface FormElementWrapperProps {
  label?: string | ReactNode;
  error?: string;
  kind: 'textarea' | 'input' | 'radio-group' | 'select';

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
export function FormElementWrapper({label, error, kind, children, style, className = ''}: PropsWithChildren<FormElementWrapperProps>) {
  return (
    <StyledWrap style={style} className={`${kind}-wrapper ${className}`}>
      {!label ? null : <FormLabel className={`${kind}-label`}>{label}</FormLabel>}

      {children}

      {!error ? null : <FormErrorMessage className={`${kind}-error-message`}>{error}</FormErrorMessage>}
    </StyledWrap>
  )
}

const StyledWrap = styled.div`
`;

/**
 * 주소폼, 인증폼 처럼 [라벨] - [폼요소] - [에러메시지] 구조를 없애고 [라벨] - [폼요소 그룹] - [에러메시지] 처럼 커스텀을 하기위해 각 스타일 컴포넌트도 같이 export함.
 */
export const FORM_ELEMENT_MARGIN = {
  labelMarginTop: "8px", // 모든 디자인시스템상 폼 요소는 라벨과 폼요소 사이 상하 간격이 같아야함.
  errorMarginTop: "8px" // 모든 디자인시스템상 폼 요소는 에러텍스트와 폼요소 사이 상하 간격이 같아야함.
};

export const FormLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: ${FORM_ELEMENT_MARGIN.labelMarginTop};
  
  gap: 4px; // 폼 라벨에 노출되는 아이콘간의 간격, 라벨텍스트와 아이콘 사이 간격 모두 2px
  
  // 모든 아이콘 크기 고정
  > * {
    width: 16px;
    height: 16px;
  }
  
  color: gray;
  font-size: 14px;
  line-height: 20px;
`;

export const FormErrorMessage = styled.span`
  display: block;
  margin-top: ${FORM_ELEMENT_MARGIN.errorMarginTop};
  color: ${THEME.error};
`;

export const INPUT_PROPERTIES = {
  lineHeight: 20
}

/**
 * <input의 테두리부분, textarea의 테두리부분 등의 폼 요소들의 공통 CSS.
 * ==> 이 폼 요소들의 아래 스타일은 반드시 똑같이 가야해서 이렇게 별도 분리함.
 */
export const commonFormElementCss = css`
  font-size: 14px;
  line-height: ${INPUT_PROPERTIES.lineHeight}px;
  
  color: gray;
  
  &::placeholder {
    color: lightgray;
  }
  
  &:disabled {
    cursor: not-allowed;
    background-color: transparent; // 브라우저 기본스타일 무시
    
    color: ${THEME.disabled};
    &::placeholder {
      color: ${THEME.disabled};
    }
  }
`;

/**
 * <input의 테두리부분, textarea의 테두리부분 등의 폼 요소들의 공통 CSS.
 * Input State = 우선순위 순서대로 disabled > error > focus > default
 * ==> 이 폼 요소들의 아래 스타일은 반드시 똑같이 가야해서 이렇게 별도 분리함.
 */
export const commonFormElementWrapperCss = css`
  padding: 8px; // 테두리와 그 안에 실제 폼요소태그 사이 패딩
  
  border: 1px solid lightgray; // Priority 4. default
  border-radius: 4px; // Shape
  
  &:focus-within {
    border-color: ${THEME.focus}; // Priority 3. focus (brand color)
  }
  
  &.error {
    border-color: ${THEME.error}; // Priority 2. error
  }
  
  :disabled, // 이거 안하면, 겉에 테두리 안감싸는 폼 요소의 경우, :has에 안걸려서 border-color가 disabled 케이스에서 동작안함.
  &:has(*:disabled) {
    border-color: ${THEME.disabled}; // Priority 1. disabled
  }
`;
