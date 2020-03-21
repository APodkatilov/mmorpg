import config, { Param } from './config';

const dbConnectionString = config.get(Param.Db);

// eslint-disable-next-line no-console
console.log(`Connection : ${dbConnectionString}`);

(async () => {
  const seeder = (await import('mongoose-seed')).default;
  const dbSeedData = (await import('./dbseed')).default;
  seeder.connect(dbConnectionString, () => {
    seeder.loadModels(dbSeedData.modelPaths);
    seeder.clearModels(dbSeedData.models, () => {
      seeder.populateModels(dbSeedData.data, () => {
        seeder.disconnect();
      });
    });
  });
})();
