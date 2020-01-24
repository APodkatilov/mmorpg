import path from 'path';
import Express from 'express';
import httpProxy from 'http-proxy';
import connectHistoryApiFallback from 'connect-history-api-fallback';
import morgan from 'morgan';
import config from '../config';


const app = new Express();
const { port } = config;

// setup the logger
if (process.env.NODE_EVN !== 'development') {
  app.use(morgan('dev'));
}

const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
});

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}` });
});


app.use('/', connectHistoryApiFallback());
app.use('/', Express.static(path.join(__dirname, '..', 'build')));
app.use('/', Express.static(path.join(__dirname, '..', 'static')));


if (process.env.NODE_EVN !== 'production') {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const Webpack = require('webpack');
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const WebpackDevMiddleware = require('webpack-dev-middleware');
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const WebpackHotMiddleware = require('webpack-hot-middleware');
  // eslint-disable-next-line global-require
  const webpackConfig = require('../webpack.dev');

  const compiler = Webpack(webpackConfig);

  app.use(WebpackDevMiddleware(compiler, {
    publicPath: '/',
    stats: { colors: true },
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
    },
  }));
  app.use(WebpackHotMiddleware(compiler));
}

app.listen(port, (err) => {
  if (err) {
    console.error('The following error has occurred while trying to start the server: ', err);
  } else {
    console.log(`===> open http://${config.host}:${config.port} in a browser to view the app`);
  }
});
