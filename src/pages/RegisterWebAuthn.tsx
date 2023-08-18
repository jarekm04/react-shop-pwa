import AuthLayout from "@features/auth/components/AuthLayout";
import RegistrationFormWebAuthn from "@features/auth/components/RegistrationFormWebAuthn";

const RegisterWebAuthn = () => {
  return (
    <AuthLayout>
      <RegistrationFormWebAuthn />
    </AuthLayout>
  );
};

export default RegisterWebAuthn;
