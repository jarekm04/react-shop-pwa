import { useAuth } from "@hooks/useAuth";
import { Spinner } from "@features/ui/Spinner";
import { AuthLayout } from "@features/ui/AuthLayout";
import RegistrationForm from "@features/auth/components/RegistrationForm";
import { RegistrationFooter } from "@features/auth/components/Footer";

const Register = () => {
  const { isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  return (
    <AuthLayout>
      <RegistrationForm />
      <RegistrationFooter />
    </AuthLayout>
  );
};

export default Register;
