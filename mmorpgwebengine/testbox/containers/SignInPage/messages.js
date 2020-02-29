/*
 * SignIn Messages
 *
 * This contains all the text for the SignIn container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SignIn';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Sign In',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  signIn: {
    id: `${scope}.signin`,
    defaultMessage: 'Sign In',
  },
  signUp: {
    id: `${scope}.signup`,
    defaultMessage: 'Don\'t have an account? Sign up',
  },
  validationFieldRequired: {
    id: `${scope}.validationFieldRequired`,
    defaultMessage: 'The fiels is required.',
  },
  validationEmailFormat: {
    id: `${scope}.validationEmailFormat`,
    defaultMessage: 'The email format is incorrect..',
  },
});
