class Response {
  constructor(success = true, data = null, error = null) {
    this.success = success;
    this.data = data;
    this.error = error;
  }

  toObject() {
    return { success: this.success, error: this.error, data: this.data };
  }
}

export default Response;
