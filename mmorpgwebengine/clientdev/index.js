/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');
const httpProxy = require('http-proxy');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const area = process.env.AREA;
const serverPort = process.env.SERVER_PORT || 3030;
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
  ? require('ngrok')
  : false;
const { resolve } = require('path');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), `build/${area}`),
  publicPath: '/',
  area,
});
const targetUrl = `http://localhost:${serverPort}`;
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}` });
});
app.use('/auth', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}` });
});

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
