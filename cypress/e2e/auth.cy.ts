describe("Auth e2e", () => {
  it("Should load and redirect to /signin", () => {
    cy.visit("http://localhost:5173");
    cy.url().should("include", "signin");
  });

  it("Should have default initial state", () => {
    cy.visit("http://localhost:5173");
    const initialAppState = {
      auth: {
        user: null,
        jwt: null,
        isAuthenticated: false,
        isLoading: false,
        isSuccess: false,
        isError: false,
      },
    };

    cy.window().its("store").invoke("getState").should("deep.equal", initialAppState);
  });

  const randomInt = Math.floor(Math.random() * 100000);
  const name = `user-${randomInt}`;
  const email = `user-${randomInt}@gmail.com`;
  const password = "password";

  it("Should navigate to sign-in upon registering", () => {
    cy.visit("http://localhost:5173");

    cy.get("#register-link").click();
    cy.get("#name").click().type(name);
    cy.get("#email").click().type(email);
    cy.get("#password").click().type(password);
    cy.get("#confirmPassword").click().type(password);

    cy.get("#register-btn").click();
    cy.wait(500);

    cy.url().should("include", "signin");
  });

  it('Sign-in button should be disabled', () => {
    cy.visit("http://localhost:5173");
    cy.contains('#signin-btn', 'Sign-In').should('have.attr', 'disabled');
  });

  it('Correct details should enable Sign-in button', () => {
    cy.visit("http://localhost:5173");
    cy.get('#email').click().type(email);
    cy.get('#password').click().type(password);

    cy.contains('#signin-btn', 'Sign-In').should('not.have.attr', 'disabled');
  });

  it('should navigate to home page', () => {
    cy.visit("http://localhost:5173");
    cy.get('#email').click().type(email);
    cy.get('#password').click().type(password);
    cy.contains('#signin-btn', 'Sign-In').click();

    cy.wait(500);

    cy.url().should('not.include', 'signin');
    cy.url().should('include', '/');
  });
});
