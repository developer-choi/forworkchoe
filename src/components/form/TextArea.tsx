import {ChangeEvent, ComponentPropsWithRef, forwardRef, Ref, useCallback, useState} from "react";
import styled from "styled-components";
import {
  commonFormElementCss,
  commonFormElementWrapperCss,
  FormElementWrapper,
  FormElementWrapperProps
} from "@/components/form/form-elements";
import classNames from "classnames";

export interface TextAreaProps extends ComponentPropsWithRef<"textarea">, Omit<FormElementWrapperProps, "kind">{
  showCount?: boolean; // maxLength까지 같이 입력되야함.
}

export default forwardRef(function TextArea({label, error, style, className, maxLength, showCount, onChange, ...rest}: TextAreaProps, ref: Ref<HTMLTextAreaElement>) {
  const [textCount, setTextCount] = useState('');

  const customChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!onChange) {
      return;
    }

    if (!showCount || !maxLength) {
      onChange(event);
      return;
    }

    const inputLength = event.target.value.length;

    if (inputLength) {
      setTextCount(`${event.target.value.length} / ${maxLength}`);
    } else {
      setTextCount('');
    }

    onChange(event);
  }, [maxLength, onChange, showCount]);

  return (
    <FormElementWrapper style={style} className={className} kind="textarea" label={label} error={error}>
      <InnerWrapper className={classNames({error})}>
        <StyledTextArea ref={ref} maxLength={maxLength} onChange={customChange} {...rest}/>
        {!textCount ? null : (
          <Count>{textCount}</Count>
        )}
      </InnerWrapper>
    </FormElementWrapper>
  )
});

const InnerWrapper = styled.div`
  ${commonFormElementWrapperCss};
  font-size: 0; // 이거 해야 컨테이너와 textarea 사이 폰트사이즈만큼의 여백이 안생김.
  
  position: relative;
`;

const StyledTextArea = styled.textarea`
  ${commonFormElementCss};
  width: 100%;
  height: 100%;
`;

/**
 * 이건 디자인따라가야함.
 * TextArea 안에다 두는 디자이너, 밖에 두는 디자이너 둘 다 있음.
 * 안에다 두면, 입력한값과 안겹치게,
 * 밖에다 두면, TextArea 바로밑에 뜨는 에러메시지같은거랑 안겹치게 주의
 */
const Count = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  font-size: 14px;
`;
