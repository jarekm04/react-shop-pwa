import { useState } from "react";
import { ValidatorFn } from "@utils/validators";

export const useInput = (validatorFn?: ValidatorFn) => {
  const [text, setText] = useState("");
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const shouldDisplayError = validatorFn ? !validatorFn(text) && hasBeenTouched : false;

  const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const inputBlurHandler = () => {
    setHasBeenTouched(true);
  };

  const clearHandler = () => {
    setText("");
    setHasBeenTouched(false);
  };

  return {
    text,
    shouldDisplayError,
    textChangeHandler,
    inputBlurHandler,
    clearHandler,
  };
};
