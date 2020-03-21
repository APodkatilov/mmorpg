export default class ResourceService {
  constructor(api) {
    this.api = api;
  }

  mapSizes() {
    return this.api.get('/resouce/battleMap/sizeTypes');
  }

  mapTypes(mapSizeId) {
    return this.api.get(`/resouce/battleMap/types/${mapSizeId}`);
  }

  maps(mapTypeId) {
    return this.api.get(`/resouce/battleMap/${mapTypeId}`);
  }

  tile(tileId) {
    return this.api.get(`/resouce/tile/${tileId}`);
  }

  tileTypes() {
    return this.api.get('/resouce/tile/types');
  }
}
