import type {ComponentPropsWithoutRef} from 'react';
import styled from 'styled-components';

export interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  required?: boolean;
  children: string; // TODO string이 아닌 케이스가 있을까?
}

export default function FormLabel({required, children, ...rest}: LabelProps) {
  return (
    <StyledLabel {...rest}>
      {children} {!required ? null : '*'}
    </StyledLabel>
  )
}

const StyledLabel = styled.label`
  margin-bottom: 8px;
`;
