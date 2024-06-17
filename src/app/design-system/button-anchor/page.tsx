'use client';

import {useForm} from 'react-hook-form';
import React from 'react';
import {styled} from 'styled-components';
import {filterPropsList, generatePropsList} from '@/util/extend/test/generate-prop';
import {ButtonColor, ButtonSize, ButtonStyleLink, ButtonVariant} from '@/components/element/Button';
import DesignSystemTestForm from '@/components/test/DesignSystemTestForm';

/**
 * Doc : https://docs.google.com/document/d/1aEHPwWUlT8nLpzuJwogzQerYawVbWIk8WCMRaxleDaI/edit
 * URL: http://localhost:3000/design-system/button-anchor
 */
const {combinations, filterRecord} = generatePropsList<ButtonProps>({
  color: ['all', undefined, 'primary', 'secondary'],
  size: ['all', undefined, 'large', 'medium'],
  variant: ['all', undefined, 'outline', 'fill'],
});

export default function ButtonPage() {
  const {register, watch} = useForm<FormData>({
    defaultValues: {
      color: 'all',
      variant: 'all',
      size: 'all',

      // checkbox type은 그대로 기본값 false 써도됨. 'true' 이런거 안해도됨.
      visibleInfo: false,
    },
  });

  const filter = watch();
  const filteredList = filterPropsList(combinations, filter);

  return (
    <DesignSystemTestForm register={register} filterRecord={filterRecord}>
      <ButtonWrap>
        {filteredList.map((props, index) => (
          <ButtonInfo key={index} visibleInfo={filter.visibleInfo} props={props}/>
        ))}
      </ButtonWrap>
    </DesignSystemTestForm>
  );
}

interface FormData {
  variant: ButtonVariant | 'all' | undefined;
  size: ButtonSize | 'all' | undefined;
  color: ButtonColor | 'all' | undefined;
  visibleInfo: boolean;
}

const ButtonWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  
  > * {
    width: 200px;
  }
`;

interface ButtonInfoProps {
  visibleInfo: boolean;
  props: ButtonProps;
}

function ButtonInfo({visibleInfo, props}: ButtonInfoProps) {
  return (
    <div>
      <ButtonStyleLink href="" {...props}>Click Me</ButtonStyleLink>
      {!visibleInfo ? null : (
        <ul>
          {Object.entries(props).map(([key, value]) => (
            <li key={key}>
              {key} = {String(value)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface ButtonProps {
  variant: ButtonVariant | undefined;
  size: ButtonSize | undefined;
  color: ButtonColor | undefined;
}
