module.exports = {
  env: process.env.NODE_ENV,
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || (process.env.NODE_ENV === 'production' ? 8080 : 3001),
  apiHost: process.env.APIHOST || '127.0.0.1',
  apiPort: process.env.APIPORT || '3030',
  webSocketPort: process.env.WSPORT || '3031',
  dbHost: 'localhost',
  dbPort: '27017',
  dbName: 'mmorpg',
  app: {
    title: 'MMORPG admin dashboard',
    description: 'MMORPG admin dashboard.',
    head: {
      titleTemplate: 'MMORPG administration',
      meta: [
        {
          name: 'description',
          content: 'MMORPG admin dashboard.',
        },
        { charset: 'utf-8' },
      ],
    },
  },
};
