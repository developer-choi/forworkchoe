import {ComponentPropsWithoutRef, forwardRef, Ref} from "react";
import styles from "./index.module.scss";

export interface SwitchProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
}

export default forwardRef(function Switch({label, style, className, ...rest}: SwitchProps, ref: Ref<HTMLInputElement>) {
  return (
    <label className={styles.label}>
      <input ref={ref} type="checkbox" {...rest} />
      {label}
    </label>
  );
});
