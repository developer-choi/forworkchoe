import React, {PropsWithChildren} from 'react';
import {styled} from 'styled-components';
import {UseFormRegister} from 'react-hook-form';

export interface DesignSystemTestFormProps extends PropsWithChildren {
  register: UseFormRegister<any>;
  filterRecord: Record<string, {
    type: string;
    name: string;
    value: any;
  }[]>;
}

export default function DesignSystemTestForm({children, register, filterRecord}: DesignSystemTestFormProps) {
  return (
    <Wrap>
      <h2>필터</h2>
      <Form>
        {Object.entries(filterRecord).map(([key, array]) => (
          <div key={key}>
            {array.map(({name, value, type}) => (
              <label key={name}>
                <input type={type} value={value} {...register(key)} />
                {name}
              </label>
            ))}
          </div>
        ))}

        <div>
          <label>
            <input type="checkbox" {...register('visibleInfo')} />
            버튼 속성 보기
          </label>
        </div>
      </Form>
      <h2 style={{marginTop: 60}}>버튼</h2>
      {children}
    </Wrap>
  )
}

const Wrap = styled.div`
  padding: 20px;
  
  form label:has(input[type="radio"]) {
    margin-right: 8px;
  }
`;

const Form = styled.form``;
