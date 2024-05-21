import styled from 'styled-components';
import type {ComponentPropsWithoutRef} from 'react';

export default function FormErrorText({children, ...rest}: ComponentPropsWithoutRef<'span'>) {
  if (!children) {
    return null;
  }

  return (
    <StyledSpan {...rest}>{children}</StyledSpan>
  );
}

const StyledSpan = styled.span`
  margin-top: 8px;
`;
