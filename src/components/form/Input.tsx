import {styled} from "styled-components";
import {
  commonFormElementCss,
  commonFormElementWrapperCss,
  FormElementWrapper,
  FormElementWrapperProps, INPUT_PROPERTIES
} from "@/components/form/form-elements";
import classNames from "classnames";
import {ComponentPropsWithRef, forwardRef, ReactNode, Ref} from "react";

export interface InputProps extends ComponentPropsWithRef<"input">, Omit<FormElementWrapperProps, "kind"> {
  rightRender?: ReactNode; // 주로 아이콘 (패스워드 인풋의 eye 아이콘 등)
  hiddenErrorMessage?: boolean; // 에러테두리는 표시하고싶은데 에러메시지는 미노출하고싶은 경우 전달 (ex: 주소폼처럼 여러개의 <Input이 셋트로 나오는 경우)
}

export default forwardRef(function Input({label, error, rightRender, style, className, hiddenErrorMessage, ...rest}: InputProps, ref: Ref<HTMLInputElement>) {
  return (
    <FormElementWrapper style={style} className={className} kind="input" label={label} error={hiddenErrorMessage ? undefined : error}>
      {/* <Input은 완전 커스텀하려면 이렇게 div 한번 더 (총 2번) 감싸는게 맞음. 아이콘까지 잘 노출시키면서, 최대치로 입력했을 때 아이콘 안가리게 해야해서. */}
      <InnerWrapper className={classNames({error})}>
        <StyledInput ref={ref} {...rest} />
        {rightRender}
      </InnerWrapper>
    </FormElementWrapper>
  );
});

/**
 * 얘가 실질적인 인풋같이 생긴 테두리도 보여주고 그 안에 아이콘, <input>등을 감싸야함.
 * 또한, 아이콘은 절대 position absolute 하면안됨. 그랬다간 별도로 텍스트 입력하던게 아이콘 덮을 수 있으니,
 * flex container로 input의 최대길이를 제한하는게 편함.
 */
const InnerWrapper = styled.div`
  ${commonFormElementWrapperCss};
  
  display: flex;
  align-items: center; // 아이콘 수직 중앙정렬
  gap: 4px; // 아이콘과 input 사이 간격
  
  >:not(input) {
    flex-shrink: 0; // 아이콘 크기가 인풋 크기와 상관없이 줄어들지않도록.
    height: ${INPUT_PROPERTIES.lineHeight}px; // 아이콘 높이값은 Input의 
  }
`;

// 얘는 실제로 딱 텍스트만 커스텀되야함.
const StyledInput = styled.input`
  ${commonFormElementCss};
  flex-grow: 1;
`;
