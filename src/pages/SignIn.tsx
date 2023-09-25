import { useAuth } from "@hooks/useAuth";
import { AuthLayout } from "@features/ui/AuthLayout";
import { Spinner } from "@features/ui/Spinner";
import { SignInFooter } from "@features/auth/components/Footer";
import SignInForm from "@features/auth/components/SignInForm";

const SignIn = () => {
  // const { isLoading } = useAuth();

  // if (isLoading) return <Spinner />;

  return (
    <AuthLayout>
      <SignInForm />
      <SignInFooter />
    </AuthLayout>
  );
};

export default SignIn;
