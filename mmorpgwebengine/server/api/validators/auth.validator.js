import { body } from "express-validator";

const signInValidationRules = () => {
  return [
    body("Login")
      .not()
      .isEmpty(),
    body("Password")
      .not()
      .isEmpty()
  ];
};

const signOnValidationRules = () => {
  return [
    body("Nickname")
      .not()
      .isEmpty()
      .trim(),
    body("Email").isEmail(),
    body("Password")
      .not()
      .isEmpty()
  ];
};

export { signOnValidationRules, signInValidationRules };
