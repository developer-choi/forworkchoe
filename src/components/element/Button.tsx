import React, {ComponentPropsWithRef} from "react";
import styled, {css} from "styled-components";
import LoadingSpinner from '@/components/element/LoadingSpinner';
import {shouldForwardPropCallback} from '@/util/extend/library/styled-components';
import {CustomLink, CustomLinkProps} from '@/components/element/CustomLink';
import {THEME} from '@/util/style/style';

/**
 * 사용법
 * 1. 아이콘 넣고 싶으면, 그냥 children에 텍스트와 같이 전달. 그러면 gap으로 텍스트, 아이콘 사이 간격 설정된 상태로 화면에 노출됨.
 */
export interface ButtonProps extends Pick<ComponentPropsWithRef<'button'>, UsedProps> {
  size?: ButtonSize; // default 'medium'
  variant?: ButtonVariant; // default 'fill'
  color?: ButtonColor; // default 'primary'
  loading?: boolean | 'mutating' | {
    mutationKey: MutationKey
  };
}

export default function Button(props: ButtonProps) {
  const {loading, children, type = 'button', ...rest} = props;
  const _loading = typeof loading === "boolean" ? loading : false; // TODO 다양한 로딩 타입으로 계산
  const size = BUTTON_SIZE[props.size ?? 'medium'];

  return (
    <StyledButton loading={_loading} type={type} {...rest}>
      {/* 로딩의 크기는 가로세로 모두 line-height만큼만 커져야 전체 버튼사이즈의 변화가 안생김. */}
      {_loading ? <LoadingSpinner className="loading" square={Number(size.lineHeight.replace('px', ''))}/> : children}
    </StyledButton>
  )
}

export function getSystemButtonStyle({disabled, loading, variant = 'fill', size = 'medium', color = 'primary'}: SystemButtonStyle) {
  const state: ButtonState = disabled ? 'disabled' : loading ? 'loading' : 'default';
  const colorSet = getColorSet(state, variant, color);
  const cursor = CURSOR[state];
  const {fontSize, lineHeight, padding} = BUTTON_SIZE[size]

  return css`
    // basic
    border-width: 1px;
    border-style: solid;
    
    // colorsets
    color: ${colorSet.color};
    background-color: ${colorSet.backgroundColor};
    border-color: ${colorSet.borderColor};
    
    // 하지만 그 규칙 무시하고 버튼에만 적용해달라는 디자이너 요청이 있어서 여기에 추가.
    :disabled {
      background-color: lightgray;
      color: white;
    }
    
    // size
    font-size: ${fontSize};
    line-height: ${lineHeight};
    padding: ${padding};
    width: 100%; // 기본 사이즈는 100%로 컨테이너 꽉 채우는게 제일 편함.
    
    // etc
    cursor: ${cursor};
    border-radius: 4px; // shape 
    
    // 아이콘과 텍스트 사이 간격 설정
    gap: 4px;
    
    > svg:not(.loading) {
      width: 16px;
      height: 16px;
    }
    
    ${state === 'loading' ?
      css`
        > svg > circle {
          stroke: ${colorSet.loadingColor};
        }
      ` : ''
    }
  `;
}

// 디자인시스템 상 버튼을 포함해서, 버튼이라면 기본적으로 갖고있어야 하는 스타일.
export const CommonButtonStyle = css`
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
  
  /* 버튼에 텍스트만 있는경우 버튼 기본스타일로 수직 수평정렬이 가능하지만, 버튼안에 아이콘들어가는 케이스때문에 이렇게 설정해야. */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  /* 이거 2개는 버튼텍스트가 길어지는경우 숨기기위함. */
  white-space: nowrap;
  overflow: hidden;
`;

const StyledButton = styled.button.withConfig({
  shouldForwardProp: shouldForwardPropCallback<ButtonProps>(['variant', 'loading'])
})<SystemButtonStyle>`
  ${CommonButtonStyle};
  ${(params) => getSystemButtonStyle(params)};
`;

// 기존 버튼에서 링크 타입만 확장하고 겉 모습은 버튼과 동일하게.
export type ButtonStyleLinkProps = CustomLinkProps & Pick<ButtonProps, "variant" | "size" | "color">;

export const ButtonStyleLink = styled(CustomLink).withConfig({
  shouldForwardProp: shouldForwardPropCallback<ButtonStyleLinkProps>(['variant'])
})<ButtonStyleLinkProps>`
  ${CommonButtonStyle};
  ${(params) => getSystemButtonStyle(params)};
  text-align: center; // button의 기본스타일
`;

// 이거 안하면 버튼 컴포넌트 사용할 때 가능한 props 전체 수백개가 뜨기때문에, 사용하는 props만 설정
type UsedProps = "style" | "className" | "onClick" | 'disabled' | 'children' | 'type';
export type ButtonSize = "medium" | "large";
export type ButtonVariant = "fill" | "outline";
export type ButtonState = "disabled" | "loading" | "default";
export type ButtonColor = 'primary' | 'secondary' | string;
type MutationKey = any; // RQ

// 위 ButtonProps 중에서 스타일 결정과 관련된 props
interface SystemButtonStyle {
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
}

const BUTTON_SIZE = {
  /**
   * figma에서는 padding 표시할 때 기준이 border 두께도 포함하는데,
   * CSS Box Modal에서는 padding 크기값에 border값이 미포함됨.
   * 그러므로 여기에 셋팅하는 padding값은 그 border두께만큼 제외하고 설정해야함.
   */
  large: {
    padding: '11px',
    fontSize: '16px',
    lineHeight: '24px',
  },
  medium: {
    padding: '9px 11px',
    fontSize: '14px',
    lineHeight: '20px',
  },
}

const CURSOR: Record<ButtonState, string> = {
  loading: 'progress',
  disabled: 'not-allowed',
  default: 'pointer'
}

function getColorSet(state: ButtonState, variant: ButtonVariant, color: ButtonColor) {
// 디자이너 요청에 따라 variant 상관없이 무조건 filled 스타일로 적용
  if (state === 'disabled') {
    return {
      borderColor: 'lightgray',
      backgroundColor: 'lightgray',
      color: 'white',
      loadingColor: 'white'
    };
  }

  const pointColor = color in BUTTON_COLOR_PRESET ? BUTTON_COLOR_PRESET[color] : color;

  return {
    borderColor: pointColor,
    backgroundColor: variant === 'fill' ? pointColor : 'white',
    color: variant === 'fill' ? 'white' : pointColor,
    loadingColor: variant === 'fill' ? 'white' : pointColor,
  };
}

const BUTTON_COLOR_PRESET: Record<ButtonColor, string> = {
  primary: THEME.brand,
  secondary: THEME.brand2
};