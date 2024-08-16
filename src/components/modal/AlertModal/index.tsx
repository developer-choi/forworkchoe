import styles from './index.module.scss';
import Modal, {ModalProps} from '@/components/modal';
import React from 'react';
import Button from '@/components/element/Button';
import {CloseModalCallback} from '@/util/extend/modal';

export interface AlertModalProps extends ModalProps {
  title?: string;
  content: string;
  onConfirm?: (onClose: CloseModalCallback) => void
}

export default function AlertModal({title, content, onClose, onConfirm, ...rest}: AlertModalProps) {
  return (
    <Modal className={styles.modal} onClose={onClose} {...rest}>
      {!title ? null : <span className={styles.title}>{title}</span>}
      <span className={styles.content}>{content}</span>
      <Button onClick={!onConfirm ? onClose : () => onConfirm(onClose)}>Confirm</Button>
    </Modal>
  );
}
