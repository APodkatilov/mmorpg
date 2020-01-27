import UserSession from '../../../models/userSession';
import Response from '../response';
import PlayerGameContext from '../../core/playerGameContext';

export const getContext = (token) => UserSession.findOne({ token })
  .then((userSession) => {
    const context = new PlayerGameContext(userSession.user);
    return context.load();
  });
export default function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json(new Response(false, null, 'Требуется атворизация.'));
  }

  getContext(authHeader).then((context) => {
    req.context = context;
    next();
    return null;
  }).catch((err) => {
    res
      .status(400)
      .json(
        new Response(false, null, `Ошибка восстановления контекста пользователя (${err.message}).`),
      );
  });
}
