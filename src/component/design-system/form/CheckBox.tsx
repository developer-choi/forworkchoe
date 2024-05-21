import type {ComponentPropsWithoutRef} from 'react';
import styled from 'styled-components';
import FormLabel from '@component/design-system/form/FormLabel';
import FormErrorText from '@component/design-system/form/FormErrorText';

interface CheckBoxProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  error?: string;
}

export default function CheckBox({label, error, checked, ...rest}: CheckBoxProps) {
  return (
    // 이 class name으로 사용하는곳에서 커스텀 대응
    <div className="checkbox-wrap">
      <StyledCheckBox checked={checked} {...rest}/>

      <NaverCheckBoxSvg color={checked ? 'green' : 'gray'}/>

      {!label ? null : <FormLabel>{label}</FormLabel>}
      <FormErrorText>{error}</FormErrorText>
    </div>
  )
}

const StyledCheckBox = styled.input`
  
`;

function NaverCheckBoxSvg({color, ...rest}: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      viewBox="0 0 26 26"
      {...rest}
    >
      <g stroke={color}>
        <g fill="#fff">
          <circle cx={13} cy={13} r={13} stroke="none" />
          <circle cx={13} cy={13} r={12.5} fill="none" />
        </g>
        <path d="M7.5 12.368l3.636 4.395 8.223-7.267" fill="none" />
      </g>
    </svg>
  );
}
