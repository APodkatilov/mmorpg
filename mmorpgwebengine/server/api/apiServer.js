import Express from "express";
import config from "../../config";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import seeder from "mongoose-seed";
import dbSeedData from "../resources/dbseed.js";
import logger from "../logger";
import morgan from "morgan";
import winston from "winston";

const port = config.apiPort;

const app = new Express();

// setup the logger
if (config.env === "development") {
  app.use(morgan("combined", { stream: logger.stream }));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/*+json" }));

app.use("/", require("./routes/todo.router"));

mongoose.Promise = require("bluebird");

const connectionString = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;

// seeder.connect(connectionString, function() {
//   seeder.loadModels(dbSeedData.modelPaths);
//   seeder.clearModels(dbSeedData.models, function() {
//     seeder.populateModels(dbSeedData.data, function() {
//       seeder.disconnect();
//     });
//   });
// });

mongoose.connect(connectionString, function(err) {
  if (err) {
    console.log(
      "Please check if you have Mongo installed. The following error occurred: ",
      err
    );
    return;
  }

  logger.add(
    new winston.transports.MongoDB({
      level: "info",
      db: connectionString,
      collection: "logs"
    })
  );
  console.log("Api Server Started");

  app.listen(port, function(err) {
    if (err) {
      console.error("err:", err);
    } else {
      console.info(
        `===> api server is running at ${config.apiHost}:${config.apiPort}`
      );
    }
  });
});
