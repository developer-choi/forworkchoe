'use client';

import {ComponentPropsWithoutRef, MouseEvent, useCallback, useEffect, useRef} from 'react';
import styles from './container.module.scss';
import classNames from 'classnames';
import {createPortal} from 'react-dom';
import {EssentialModalProps} from '@/util/extend/modal';

export interface ModalContainerProps extends EssentialModalProps, Omit<ComponentPropsWithoutRef<'div'>, 'onClick'> {
  easilyClose?: boolean; // backdrop / esc 눌러서 모달 닫게 해주는 기능, default false
  type: 'centerAlign' | 'bottomSheet' | 'fullScreen';
  size?: 'large' | 'medium'; // center-align 모달에서만 사용함
}

// Alert, Confirm 등 모달 확장할 때 이 타입을 확장하기
export type ComposedModalProps = Omit<ModalContainerProps, 'type' | 'size'>;

export function ModalContainer({className, size = 'medium', type, easilyClose, onClose, ...rest}: ModalContainerProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const escHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (easilyClose) {
          onClose();
        } else {
          event.preventDefault();
        }
      }
    }

    document.addEventListener('keydown', escHandler);

    return () => {
      document.removeEventListener('keydown', escHandler);
    };
  }, [easilyClose, onClose]);

  useEffect(() => {
    const modal = modalRef.current;
    modal?.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      modal?.close();
      document.body.style.overflow = 'auto';
    };
  }, []);

  const onClickBackdrop = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (type === 'fullScreen') {
      return;
    }

    event.stopPropagation();
  }, [type]);

  // https://docs.google.com/document/d/16-Z3RmslEMvhfwOMmePYTRg4HkUjKjWSxxF2SB7NGGU/edit#heading=h.dpm2y2x8qp1i
  return createPortal((
    <dialog ref={modalRef} className={styles[type + 'Container']} onClick={easilyClose ? onClose : undefined}>
      <div className={classNames(styles.rootModalInner, styles[type + 'Inner'], styles[size], className)} onClick={onClickBackdrop} {...rest} />
    </dialog>
  ), document.body);
}
