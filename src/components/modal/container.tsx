'use client';

import {
  ComponentPropsWithoutRef,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef
} from 'react';
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
export type ComposedModalProps = Omit<ModalContainerProps, 'type'>;

export function ModalContainer({className, size = 'medium', type, ...rest}: ModalContainerProps) {
  const onClickModalContent = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (type === 'fullScreen') {
      return;
    }

    event.stopPropagation();
  }, [type]);

  return (
    <RootModalContainer
      containerClassName={styles[type + 'Container']}
      className={classNames(styles[type + 'Inner'], styles[size], className)}
      onClickBackdrop={onClickModalContent}
      {...rest}
    />
  );
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
interface RootModalContainerProps extends Omit<ModalContainerProps, 'type' | 'size'> {
  containerClassName?: string;
  onClickBackdrop?: MouseEventHandler<HTMLDivElement>;
}

/**
 * Modal은 반드시 Client Component에서만 사용할 수 있습니다.
 * 센터정렬모달 / 바텀시트모달 / 풀스크린모달의 공통 기능을 구현합니다.
 */
function RootModalContainer({className, easilyClose, onClose, containerClassName, onClickBackdrop, ...rest}: RootModalContainerProps) {
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

  // https://docs.google.com/document/d/16-Z3RmslEMvhfwOMmePYTRg4HkUjKjWSxxF2SB7NGGU/edit#heading=h.dpm2y2x8qp1i
  return createPortal((
    <dialog ref={modalRef} className={containerClassName} onClick={easilyClose ? onClose : undefined}>
      <div className={classNames(styles.rootModalInner, className)} onClick={onClickBackdrop} {...rest} />
    </dialog>
  ), document.body);
}
