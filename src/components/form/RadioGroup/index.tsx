import React from "react";
import {FormElementWrapper} from "@/components/form/form-elements";
import styles from './index.module.scss';

// TODO 다른 props 생략
export function RadioGroup() {
  return (
    <FormElementWrapper>
      <div className={styles.innerContainer}>
        <Radio/>
        <Radio/>
        <Radio/>
        <Radio/>
        <Radio/>
      </div>
    </FormElementWrapper>
  );
}

function Radio() {
  return null;
}
