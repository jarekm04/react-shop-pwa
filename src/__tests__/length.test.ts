import { validateName, validatePassword } from "@utils/validators";

describe('Field length validation', () => {
  describe('Name field', () => {
    let name = '';

    test('a name should fail length validation if it is not set', () => {
      expect(validateName(name)).toEqual(false);
    });

    test('a name should fail length validation if it is less than 2 characters', () => {
      name = 'J';
      expect(validateName(name)).toEqual(false);
    });

    test('a name should pass length validation if it is 2 characters', () => {
      name = 'Ja';
      expect(validateName(name)).toEqual(true);
    });

    test('a name should pass length validation if it is more than 2 characters', () => {
      name = 'Jar';
      expect(validateName(name)).toEqual(true);
    });
  });
  describe('Password field validation', () => {
    let password = '';

    test('a password should fail length validation if it is not set', () => {
      expect(validatePassword(password)).toEqual(false);
    });

    test('a password should fail length validation if it is less than 2 characters', () => {
      password = 'J';
      expect(validatePassword(password)).toEqual(false);
    });

    test('a password should fail length validation if it is more than 20 characters', () => {
      password = 'qwertyuiopqwertyuiopqwertyuiop';
      expect(validatePassword(password)).toEqual(false);
    });

    test('a password should pass length validation if it is 6-20 characters', () => {
      password = 'password';
      expect(validatePassword(password)).toEqual(true);
    });
  });
});
