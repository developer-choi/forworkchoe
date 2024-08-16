import React from 'react';
import CheckBox from '@component/design-system/form/CheckBox';

// URL: http://localhost:3000/examples/design-system
export default function Page() {
  return (
    <>
      <CheckBox label="라벨" checked onChange={() => {}}/>
      <CheckBox label="라벨" checked={false} onChange={() => {}} error="대충 필수약관 동의안했다는 메시지"/>
    </>
  );
}
