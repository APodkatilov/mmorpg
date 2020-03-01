import path from 'path';
import nconf from 'nconf';

const env = process.env.NODE_ENV;

export const Env = Object.freeze({
  Production: 'production',
  Development: 'development',
});

export const Param = Object.freeze({
  Env: 'env',
  ApiHost: 'apiHost',
  ApiPort: 'apiPort',
  ClientHost: 'clientHost',
  ClientPort: 'clientPort',
  Db: 'db',
  ImagePath: 'imagePath',
  MongoLogCollection: 'mongoLogCollection',
});


const config = nconf
  .argv({ parseValues: true })
  .env({
    lowerCase: true,
    parseValues: true,
    transform: (p) => {
      if (p.key === 'node_env') {
        // eslint-disable-next-line no-param-reassign
        p.key = 'env';
      }
      if (p.key === 'mongodb_url') {
        // eslint-disable-next-line no-param-reassign
        p.key = 'db';
      }
      if (p.key === 'port') {
        // eslint-disable-next-line no-param-reassign
        p.key = 'apiPort';
      }
      return p;
    },
  })
  .file('base', { file: path.join(__dirname, '../config/config.base.json') })
  .file('envparam', { file: path.join(__dirname, `../config/config.${env}.json`) });


export default config;
