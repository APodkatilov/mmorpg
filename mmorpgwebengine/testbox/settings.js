class Settings {
  static Token = 'Token';

  get apiUrl() {
    return '/api';
  }

  getWsUrl(token) {
    // const protocol = window.location.protocol.startsWith('https') ? 'wss' : 'ws';
    // return `${protocol}://${window.location.hostname}:${window.location.port}?token=${token}`;
    return `ws://localhost:3030?token=${token}`;
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
