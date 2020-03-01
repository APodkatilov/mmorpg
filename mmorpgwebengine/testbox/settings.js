class Settings {
  static Token = 'Token';

  get apiUrl() {
    return '/';
  }

  get authToken() {
    return sessionStorage[Settings.Token];
  }

  set authToken(token) {
    if (token) {
      sessionStorage[Settings.Token] = token;
    } else {
      sessionStorage.removeItem(Settings.Token);
    }
  }
}

export default new Settings();
