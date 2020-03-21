/* eslint-disable no-underscore-dangle */
import AuthService from './auth';
import BattleService from './battle';
import ResourceService from './resource';
import Settings from '../settings';
import { createApi } from './util';


class SerrviceFactory {
    _authService = null;

    _battleService = null;

    _resourceService = null;

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

    get battleService() {
      if (!this._battleService) {
        const { api, source } = createApi(Settings.apiUrl, Settings.authToken);
        this._battleService = new BattleService(api);
        this.sources.push(source);
      }
      return this._battleService;
    }

    get resouceService() {
      if (!this._resourceService) {
        const { api, source } = createApi(Settings.apiUrl, Settings.authToken);
        this._resourceService = new ResourceService(api);
        this.sources.push(source);
      }
      return this._resourceService;
    }
}

export const serviceFactory = new SerrviceFactory();
