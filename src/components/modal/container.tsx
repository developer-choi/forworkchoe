'use client';

import {
  ComponentPropsWithoutRef,
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef
} from 'react';
import styles from './container.module.scss';
import classNames from 'classnames';
import {createPortal} from 'react-dom';
import {EssentialModalProps} from '@/util/extend/modal';

export interface CenterAlignModalContainerProps extends ModalContainerProps {
  size?: 'large' | 'medium';
}

// TODO 가만보니 컨테이너 3종 전부 HTML 구조 같고 className만 다르게 쓰고있으니 통합 가능해보임!
export function CenterAlignModalContainer({className, size = 'medium', ...rest}: CenterAlignModalContainerProps) {
  const onClickModalContent = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  return (
    <RootModalContainer
      containerClassName={styles.centerAlignContainer}
      className={classNames(styles.centerAlignInner, styles[size], className)}
      onClickBackdrop={onClickModalContent}
      {...rest}
    />
  );
}

export function BottomSheetModalContainer({className, ...rest}: ModalContainerProps) {
  const onClickModalContent = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  return (
    <RootModalContainer
      containerClassName={styles.bottomSheetContainer}
      className={classNames(styles.bottomSheetInner, className)}
      onClickBackdrop={onClickModalContent}
      {...rest}
    />
  );
}

export function FullScreenModalContainer(props: ModalContainerProps) {
  return (
    <RootModalContainer className={styles.fullScreenInner} {...props}/>
  );
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
interface ModalContainerProps extends EssentialModalProps, Omit<ComponentPropsWithoutRef<'div'>, 'onClick'> {
  easilyClose?: boolean; // backdrop / esc 눌러서 모달 닫게 해주는 기능, default false
}

interface RootModalContainerProps extends PropsWithChildren<ModalContainerProps> {
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
