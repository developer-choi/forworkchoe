import {forwardRef, type HTMLAttributes, type KeyboardEvent, type MouseEvent, type ReactNode, useId} from 'react';
import Modal from './Modal';
import styles from './Dialog.module.scss';

interface DialogContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const DialogContainer = forwardRef<HTMLDivElement, DialogContainerProps>(function DialogContainer(props, ref) {
  const {children, className, ...other} = props;
  return (
    <div
      ref={ref}
      role="presentation"
      className={`${styles.container} ${className || ''}`.trim()}
      {...other}
    >
      {children}
    </div>
  );
});

interface DialogPaperProps extends HTMLAttributes<HTMLDivElement> {
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

function DialogPaper(props: DialogPaperProps) {
  const {children, className, ...other} = props;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`${styles.paper} ${className || ''}`.trim()}
      {...other}
    >
      {children}
    </div>
  );
}

export interface DialogProps {
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
  children: ReactNode;
  className?: string;
  disableEscapeKeyDown?: boolean;
  disableBackdropClick?: boolean;
  onClose?: (
    event: KeyboardEvent | MouseEvent,
    reason: 'escapeKeyDown' | 'backdropClick'
  ) => void;
  open: boolean;
}

export default function Dialog(inProps: DialogProps) {
  const {
    'aria-describedby': ariaDescribedby,
    'aria-labelledby': ariaLabelledbyProp,
    children,
    className,
    disableEscapeKeyDown = false,
    disableBackdropClick = false,
    onClose,
    open,
    ...other
  } = inProps;

  const generatedId = useId();
  const ariaLabelledby = ariaLabelledbyProp || generatedId;

  return (
    <Modal
      className={className}
      disableEscapeKeyDown={disableEscapeKeyDown}
      disableBackdropClick={disableBackdropClick}
      onClose={onClose}
      open={open}
      {...other}
    >
      <DialogContainer>
        <DialogPaper
          aria-describedby={ariaDescribedby}
          aria-labelledby={ariaLabelledby}
        >
          {children}
        </DialogPaper>
      </DialogContainer>
    </Modal>
  );
}
