import AuthLayout from "@features/auth/components/AuthLayout";
import SignInForm from "@features/auth/components/SignInForm";

const SignIn = () => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;
