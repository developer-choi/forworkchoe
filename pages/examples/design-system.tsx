import React from 'react';
import type {GetServerSideProps} from 'next';
import CheckBox from '@component/design-system/form/CheckBox';

// URL: http://localhost:3000/examples/design-system
export default function Page() {
  return (
    <>
      <CheckBox checked/>
      <CheckBox checked={false}/>
    </>
  );
}
