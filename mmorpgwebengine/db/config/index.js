import path from 'path';
import nconf from 'nconf';

const location = process.env.LOCATION;

export const Location = Object.freeze({
  Local: 'local',
  Heroku: 'heroku',
});

export const Param = Object.freeze({
  Db: 'db',
});


const config = nconf
  .argv({ parseValues: true })
  .env({
    lowerCase: true,
    parseValues: true,
    transform: (p) => p,
  })
  .file('base', { file: path.join(__dirname, './config.base.json') })
  .file('envparam', { file: path.join(__dirname, `./config.${location}.json`) });


export default config;
