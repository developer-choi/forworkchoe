'use client';

import React, {useCallback, useState} from 'react';
import Button from '@/components/element/Button';
import Radio, {RadioGroup} from '@/components/form/Radio';
import {ModalContainer, ModalContainerProps} from '@/components/modal/container';
import {useForm} from 'react-hook-form';
import {DefaultModalHeader} from '@/components/modal/header';
import DefaultModalBody from '@/components/modal/body';
import {OneButtonModalFooter} from '@/components/modal/footer';

// URL: http://localhost:3000/solution/etc/modal
// Doc: https://docs.google.com/document/d/16-Z3RmslEMvhfwOMmePYTRg4HkUjKjWSxxF2SB7NGGU/edit
export default function Page() {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const {register, watch} = useForm<FormData>({
    defaultValues: {
      type: 'centerAlign',
      title: 'short',
      content: 'short'
    }
  });

  const {type, title, content} = watch();
  const result = {
    title: 'title '.repeat(title === 'short' ? 1 : 13),
    content: 'content '.repeat(content === 'short' ? 20 : 600),
  };

  return (
    <div>
      <form>
        <RadioGroup>
          <Radio label="CenterAlign" value="centerAlign" {...register('type')}/>
          <Radio label="BottomSheet" value="bottomSheet" {...register('type')}/>
          <Radio label="FullScreen" value="fullScreen" {...register('type')}/>
        </RadioGroup>
        <RadioGroup>
          <Radio label="short" value="short" {...register('title')}/>
          <Radio label="long" value="long" {...register('title')}/>
        </RadioGroup>
        <RadioGroup>
          <Radio label="short" value="short" {...register('content')}/>
          <Radio label="long" value="long" {...register('content')}/>
        </RadioGroup>
      </form>
      <Button onClick={openModal}>Open modal</Button>
      <ModalContainer type={type} onClose={closeModal} open={open}>
        <DefaultModalHeader>{result.title}</DefaultModalHeader>
        <DefaultModalBody>
          {result.content}
        </DefaultModalBody>
        <OneButtonModalFooter buttonProps={{onClick: closeModal, children: 'Confirm'}}/>
      </ModalContainer>
    </div>
  );
}

interface FormData {
  type: ModalContainerProps['type'];
  title: 'short' | 'long';
  content: 'short' | 'long';
}
