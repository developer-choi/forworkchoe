import {CenterAlignModalContainer, CenterAlignModalContainerProps} from '@/components/modal/container';
import React from 'react';
import {CloseModalCallback} from '@/util/extend/modal';
import {DefaultModalHeader} from '@/components/modal/header';
import {OneButtonModalFooter} from '@/components/modal/footer';
import DefaultModalBody from '@/components/modal/body';

export interface AlertModalProps extends CenterAlignModalContainerProps {
  title: string;
  content: string;
  onConfirm?: (onClose: CloseModalCallback) => void
}

export default function AlertModal({title, content, onClose, onConfirm, ...rest}: AlertModalProps) {
  return (
    <CenterAlignModalContainer onClose={onClose} {...rest}>
      <DefaultModalHeader>{title}</DefaultModalHeader>
      <DefaultModalBody>
        {content}
      </DefaultModalBody>
      <OneButtonModalFooter buttonProps={{onClick: !onConfirm ? onClose : () => onConfirm(onClose), children: 'Confirm'}}/>
    </CenterAlignModalContainer>
  );
}
