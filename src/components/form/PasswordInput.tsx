import Input, {InputProps} from "@/components/form/Input";
import React, {useCallback, useState} from "react";
import EyeOnSvg from "@/components/icon/EyeOnSvg";
import EyeOffSvg from "@/components/icon/EyeOffSvg";

export type PasswordInputProps = Omit<InputProps, "type" | "rightRender">;

export default function PasswordInput(props: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const showPassword = useCallback(() => {
    setIsPasswordVisible(true);
  }, []);

  const hidePassword = useCallback(() => {
    setIsPasswordVisible(false);
  }, []);

  const eyeIcon = isPasswordVisible ? <EyeOffSvg onClick={hidePassword} /> : <EyeOnSvg onClick={showPassword} />;

  return <Input type={isPasswordVisible ? "text" : "password"} rightRender={eyeIcon} {...props} />;
}
