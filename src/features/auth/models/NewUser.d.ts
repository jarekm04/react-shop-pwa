import { RegisterFormFieldTypes } from "./RegistrationFormField";

export type NewUserTypes = Omit<RegisterFormFieldTypes, "confirmPassword">;
