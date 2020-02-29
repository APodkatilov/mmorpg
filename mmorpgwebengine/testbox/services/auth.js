export default class AuthService {
  constructor(api) {
    this.api = api;
  }

  auth(email, password) {
    return this.api.post('/auth/signin', { login: email, password });
  }
}
