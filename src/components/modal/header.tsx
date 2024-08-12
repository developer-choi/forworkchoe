import styles from './header.module.scss';
import classNames from 'classnames';
import {ComponentPropsWithoutRef} from 'react';

// 일단 header 태그의 전체 props를 확장함으로써 혹시모를 커스텀 대비
export interface DefaultModalHeaderProps extends ComponentPropsWithoutRef<'header'> {

}

/**
 * 타이틀만 나오거나,
 * 타이틀 + X버튼 나오거나.
 */
export function DefaultModalHeader({className, ...rest}: DefaultModalHeaderProps) {
  return (
    <header className={classNames(styles.defaultHeader, className)} {...rest}/>
  );
}
