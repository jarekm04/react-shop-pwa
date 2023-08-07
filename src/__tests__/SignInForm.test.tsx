import { reducer, screen } from "../utils/test-utils";
import SignInForm from "@features/auth/components/SignInForm";

describe("Sign-In Form", () => {
  let signInButton: HTMLElement | null = null;
  beforeEach(() => {
    reducer(<SignInForm />);
    signInButton = screen.getByRole("button", { name: /sign-in/i });
  });

  test("login button should be in the document", () => {
    expect(signInButton).toBeInTheDocument();
  });

  test("login button should initially be disabled", () => {
    expect(signInButton).toBeDisabled();
  });
});
