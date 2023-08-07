import { validateEmail } from "@utils/validators";

describe("Email validation", () => {
  let email = "";

  test("An empty input should not be valid", () => {
    expect(validateEmail(email)).toEqual(false);
  });

  test("it should have an @ symbol", () => {
    email = "jarek@wp.pl";
    expect(email.includes("@")).toEqual(true);
  });

  test("it should have an . symbol", () => {
    email = "jarek@wp.pl";
    expect(email.includes(".")).toEqual(true);
  });

  test("it should pass validation", () => {
    expect(validateEmail(email)).toEqual(true);
  });

  test("an invalid email should not pass validation", () => {
    email = "jarek@wp";
    expect(validateEmail(email)).toEqual(false);
  });
});
