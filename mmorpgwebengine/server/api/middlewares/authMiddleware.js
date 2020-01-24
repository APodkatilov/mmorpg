import UserSession from '../../../models/userSession';
import Response from '../response';

export default function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json(new Response(false, null, 'Требуется атворизация.'));
  }
  UserSession.findOne({ token: authHeader })
    .then((userSession) => {
      if (res != null) {
        req.context = userSession;
        next();
      } else {
        res
          .status(400)
          .json(
            new Response(false, null, 'Токен авторизации не действителен.'),
          );
      }
      return null;
    })
    .catch((err) => {
      res
        .status(400)
        .json(new Response(false, null, `Ошибка проверки авторизации (${err.message}).`));
    });
}
