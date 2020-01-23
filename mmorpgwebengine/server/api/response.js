class Response {
  constructor(success = true, data = null, error = null) {
    this._success = success;
    this._data = data;
    this._error = error;
  }

  toObject() {
    return { success: this._success, error: this._error, data: this._data };
  }
}

export default Response;
