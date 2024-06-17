import React from "react";
import {FormElementWrapper} from "@/components/form/form-elements";
import styled from "styled-components";

// 다른 props 생략
export function RadioGroup() {
  return (
    <FormElementWrapper kind="radio-group">
      <InnerWrap>
        <Radio/>
        <Radio/>
        <Radio/>
        <Radio/>
        <Radio/>
      </InnerWrap>
    </FormElementWrapper>
  );
}

// 라디오버튼 여러개를 격자모양으로 노출하기위한 안쪽 Wrapper, 얘 형재관계로 위에 Label, 아래에 에러텍스트가 있음.
const InnerWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

function Radio() {
  return null;
}
