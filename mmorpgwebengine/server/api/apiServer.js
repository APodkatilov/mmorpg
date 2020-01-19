import Express from 'express';
import config from '../../config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

const port = config.apiPort;

const app = new Express();
 
// setup the logger
if (config.env === 'development') {
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

    app.use(morgan('combined', { stream: accessLogStream }))
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({ type: 'application/*+json' }));

app.use('/', require('./routes/todo.router'));

mongoose.Promise = require('bluebird');
mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`, function (err) {
    if (err) {
        console.log("Please check if you have Mongo installed. The following error occurred: ", err);
        return;
    }
    console.log('Api Server Started');

    app.listen(port, function (err) {
        if (err) {
            console.error('err:', err);
        } else {
            console.info(`===> api server is running at ${config.apiHost}:${config.apiPort}`)
        }
    });
});
