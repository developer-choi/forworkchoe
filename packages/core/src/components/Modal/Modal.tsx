import {cloneElement, type HTMLAttributes, type KeyboardEvent, type MouseEvent, type ReactElement, type ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import FocusTrap from './FocusTrap';
import Portal from './Portal';
import styles from './Modal.module.scss';

interface ModalRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function ModalRoot(props: ModalRootProps) {
  const {className = '', children, ...other} = props;

  return (
    <div
      role="presentation"
      className={`${styles.modalRoot} ${className}`.trim()}
      {...other}
    >
      {children}
    </div>
  );
}

function ModalBackdrop(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={styles.backdrop}
      {...props}
    />
  );
}

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactElement;
  onClose?: (
    event: KeyboardEvent | MouseEvent,
    reason: 'escapeKeyDown' | 'backdropClick'
  ) => void;
  open: boolean;
  disableEscapeKeyDown?: boolean;
}

export default function Modal(props: ModalProps) {
  const {
    children,
    className,
    onClose,
    open,
    disableEscapeKeyDown = false,
    ...other
  } = props;

  const [exited, setExited] = useState(!open);
  const backdropClickRef = useRef(false);

  // Open state change effect
  useEffect(() => {
    if (open) {
      setExited(false);
    } else {
      setExited(true);
    }
  }, [open]);

  // ESC Key Handler
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Escape') {
      return;
    }

    if (!disableEscapeKeyDown && onClose) {
      event.stopPropagation();
      onClose(event, 'escapeKeyDown');
    }
  }, [disableEscapeKeyDown, onClose]);

  // Backdrop Mouse Handlers
  const handleBackdropMouseDown = useCallback((event: MouseEvent) => {
    backdropClickRef.current = event.target === event.currentTarget;
  }, []);

  const handleBackdropClick = useCallback((event: MouseEvent) => {
    if (!backdropClickRef.current) {
      return;
    }
    backdropClickRef.current = false;

    if (event.target !== event.currentTarget) {
      return;
    }

    if (onClose) {
      onClose(event, 'backdropClick');
    }
  }, [onClose]);

  if (!open && exited) {
    return null;
  }

  const childProps: any = {};
  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = -1;
  }

  return (
    <Portal>
      <ModalRoot
        onKeyDown={handleKeyDown}
        className={className}
        {...other}
        style={{
          visibility: !open && exited ? 'hidden' : undefined,
          ...other.style,
        }}
      >
        <ModalBackdrop
          onMouseDown={handleBackdropMouseDown}
          onClick={handleBackdropClick}
        />

        <FocusTrap open={open}>
          {cloneElement(children, childProps)}
        </FocusTrap>
      </ModalRoot>
    </Portal>
  );
}
