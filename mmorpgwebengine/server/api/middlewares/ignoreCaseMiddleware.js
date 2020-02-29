import camelCase from 'camelcase';

export default (req, res, next) => {
  req.query = new Proxy(req.query, {
    get: (target, name) => target[Object.keys(target)
      .find((key) => key.toLowerCase() === name.toLowerCase())],
  });

  req.body = new Proxy(req.body, {
    get: (target, name) => target[Object.keys(target)
      .find((key) => camelCase(key) === name)],
  });

  next();
};
