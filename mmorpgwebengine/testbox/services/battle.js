export default class BattleService {
  constructor(api) {
    this.api = api;
  }

  create(mapId) {
    return this.api.post('/battle/create', { mapId });
  }

  connect(battleId, teamId) {
    return this.api.post('/battle/connect', { battleId, teamId });
  }

  getActives() {
    return this.api.get('/battle/actives');
  }

  getTeams(battleId) {
    return this.api.post(`/${battleId}/teams`);
  }
}
