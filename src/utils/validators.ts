export type ValidatorFn = (text: string, options?: object) => boolean;

export interface LengthOptions {
  min?: number;
  max?: number;
}

export const validateEmail: ValidatorFn = (email: string): boolean => {
  // RFC2822
  const re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  return re.test(email.trim());
};

const validateLength: ValidatorFn = (
  text: string,
  options?: LengthOptions
): boolean => {
  const textLength = text.trim().length;

  if (options?.min && textLength < options.min) return false;
  if (options?.max && textLength > options.max) return false;

  return true;
};

export const validateName: ValidatorFn = (text: string): boolean => {
  return validateLength(text, { min: 2 });
};

export const validatePassword: ValidatorFn = (text: string): boolean => {
  return validateLength(text, { min: 6, max: 20 });
};