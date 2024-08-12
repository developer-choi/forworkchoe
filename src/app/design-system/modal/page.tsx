'use client';

import React, {useCallback} from 'react';
import AlertModal from '@/components/modal/preset/AlertModal';
import Button from '@/components/element/Button';
import {useOpenModal} from '@/util/extend/modal';

// URL: http://localhost:3000/solution/etc/modal
// Doc: https://docs.google.com/document/d/16-Z3RmslEMvhfwOMmePYTRg4HkUjKjWSxxF2SB7NGGU/edit
export default function Page() {
  const {openModal, openAlertModal} = useOpenModal();

  const onClick = useCallback(() => {
    openModal({
      Component: AlertModal,
      props: {
        title: '123',
        content: 'abc'.repeat(1600)
      }
    });
  }, [openModal]);

  const onClick2 = useCallback(() => {
    openAlertModal("World");
  }, [openAlertModal]);

  const onParentClick = useCallback(() => {
    console.log('event bubbled');
  }, []);

  return (
    <div onClick={onParentClick}>
      <Button onClick={onClick}>Open modal</Button>
      <Button onClick={onClick2}>Open Alert modal</Button>
    </div>
  );
}
