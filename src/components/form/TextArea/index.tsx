import {ChangeEvent, ComponentPropsWithRef, forwardRef, Ref, useCallback, useState} from "react";
import styles from './index.module.scss';
import {
  FormElementWrapper,
  FormElementWrapperProps
} from "@/components/form/form-elements";
import classNames from "classnames";

export interface TextAreaProps extends ComponentPropsWithRef<"textarea">, Omit<FormElementWrapperProps, "kind">{
  showCount?: boolean; // maxLength까지 같이 입력되야함.
}

export default forwardRef(function TextArea({label, error, style, className, maxLength, showCount, onChange, ...rest}: TextAreaProps, ref: Ref<HTMLTextAreaElement>) {
  const [textCount, setTextCount] = useState('');

  const customChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!onChange) {
      return;
    }

    if (!showCount || !maxLength) {
      onChange(event);
      return;
    }

    const inputLength = event.target.value.length;

    if (inputLength) {
      setTextCount(`${event.target.value.length} / ${maxLength}`);
    } else {
      setTextCount('');
    }

    onChange(event);
  }, [maxLength, onChange, showCount]);

  return (
    <FormElementWrapper style={style} className={className} label={label} error={error}>
      <div className={classNames(styles.innerContainer, {[styles.error]: error})}>
        <textarea ref={ref} maxLength={maxLength} onChange={customChange} className={styles.textarea} {...rest}/>
        {!textCount ? null : (
          <div className={styles.count}>{textCount}</div>
        )}
      </div>
    </FormElementWrapper>
  )
});
