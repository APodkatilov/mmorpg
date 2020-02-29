import authRouter from './auth.router';
import resourceRouter from './resource.router';
import battleRouter from './battle.router';
import playerRouter from './player.router';

import authMiddleware from '../middlewares/authMiddleware';
import config, { Param, Env } from '../../config';

class RouteRegistrator {
  register(app) {
    app.use('/auth', authRouter);

    app.use('/resource', authMiddleware, resourceRouter);
    app.use('/battle', authMiddleware, battleRouter);
    app.use('/player', authMiddleware, playerRouter);
    app.get('*', (req, res) => {
      res.end('Route is not supported!');
    });

    app.use((req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    if (config.get(Param.Env) === Env.Development) {
      app.use((err, req, res) => {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err,
        });
      });
    } else {
      app.use((err, req, res) => {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: {},
        });
      });
    }
  }
}

export default new RouteRegistrator();
