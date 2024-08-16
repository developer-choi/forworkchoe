'use client';

import {useForm} from 'react-hook-form';
import React, {useState} from 'react';
import TextArea from '@/components/form/TextArea';
import {styled} from 'styled-components';
import {filterPropsList, generatePropsList} from '@/util/extend/test/generate-prop';

/**
 * Doc : https://docs.google.com/document/d/1l3CZHTA4ja1ovUC0fiZ9-Fb72_PMXdLTx_0gNhZ39Jg/edit
 * URL: http://localhost:3000/design-system/textarea
 */
const {combinations, filterRecord} = generatePropsList<TextAreaProps>({
  disabled: 'boolean',
  error: [undefined, 'error text'],
  label: [undefined, 'label text'],
  placeholder: [undefined, 'placeholder text'],
  info: [undefined, 'info text'],
  //@ts-ignore
  rows: [undefined, '2', '4']
});

export default function TextAreaPage() {
  const {register, watch} = useForm<TestFormData>({
    defaultValues: {
      disabled: false,
      placeholder: '',
      info: '',
      label: '',
      error: '',
      rows: ''
    }
  });

  const filteredList = filterPropsList(combinations, watch());

  return (
    <Wrap>
      <form>
        {Object.entries(filterRecord).map(([key, array]) => (
          <div key={key}>
            {array.map(({name, value, type}) => (
              <label key={name}>
                <input type={type} value={value} {...register(key as keyof TextAreaProps)} />
                {name}
              </label>
            ))}
          </div>
        ))}
      </form>

      <TextAreaList>
        {filteredList.map((props, index) => (
          <TextAreaTester key={index} {...props} />
        ))}
      </TextAreaList>
    </Wrap>
  );
}

interface TestFormData {
  placeholder: string | '';
  label: string | '';
  error: string | '';
  info: string | '';
  disabled: boolean;
  rows: 2 | 4 | '';
}

interface TextAreaProps {
  disabled: boolean;
  placeholder: string | undefined;
  label: string | undefined;
  error: string | undefined;
  info: string | undefined;
  rows: 2 | 4 | undefined;
}

function TextAreaTester(props: TextAreaProps) {
  const [value, setValue] = useState('');

  return <TextArea {...props} value={value} onChange={(event) => setValue(event.target.value)}/>;
}

const Wrap = styled.div`
  padding: 20px;
  
  form label:has(input[type="radio"]) {
    margin-right: 8px;
  }
`;

const TextAreaList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  
  > * {
    width: 300px;
  }
`;
