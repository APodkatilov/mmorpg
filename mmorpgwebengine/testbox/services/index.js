/* eslint-disable no-underscore-dangle */
import AuthService from './auth';
import Settings from '../settings';
import { createApi } from './util';

class SerrviceFactory {
    _authService = null;

    sources = [];

    reset() {
      const { sources } = this;
      // eslint-disable-next-line no-restricted-syntax, no-unused-vars
      for (const source of sources) {
        source.cancel();
      }

      sources.splice(0, sources.length);
    }

    get authService() {
      if (!this._authService) {
        const { api, source } = createApi(Settings.apiUrl);
        this._authService = new AuthService(api);
        this.sources.push(source);
      }
      return this._authService;
    }
}

export const serviceFactory = new SerrviceFactory();
