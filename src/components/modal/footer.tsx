import styles from './footer.module.scss';
import classNames from 'classnames';
import {ComponentPropsWithoutRef} from 'react';
import Button, {ButtonProps} from '@/components/element/Button';

// 일단 footer 태그의 전체 props를 확장함으로써 혹시모를 커스텀 대비
export interface OneButtonModalFooterProps extends Omit<ModalFooterProps, 'children'> {
  buttonProps?: Pick<ButtonProps, 'children' | 'onClick' | 'type' | 'className' | 'style'>;
}

/**
 * 타이틀만 나오거나,
 * 타이틀 + X버튼 나오거나.
 */
export function OneButtonModalFooter({className, buttonProps, ...rest}: OneButtonModalFooterProps) {
  return (
    <ModalFooter className={classNames(styles.oneButtonFooter, className)} {...rest}>
      <Button {...buttonProps}/>
    </ModalFooter>
  );
}

type ModalFooterProps = ComponentPropsWithoutRef<'footer'>;

// 추후 어떤 푸터가 추가 되더라도, 푸터 껍데기 (하단간격, 좌우간격)는 스타일이 변하지않음.
function ModalFooter({className, ...rest}: ModalFooterProps) {
  return (
    <footer className={classNames(styles.oneButtonFooter, className)} {...rest}/>
  )
}