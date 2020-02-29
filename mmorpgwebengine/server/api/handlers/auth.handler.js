import User from '../../models/user';
import UserSession from '../../models/userSession';
import Response from '../response';

export const signIn = (req, res) => {
  const { login, password } = req.body;

  User.singIn(login, password)
    .then((user) => {
      UserSession.register(user)
        .then((userSession) => res.status(200).json(
          new Response(true, {
            token: userSession.token,
          }).toObject(),
        ))
        .catch((err) => res
          .status(400)
          .json(
            new Response(false, null, `Ошибка авторизации (${err.message})`),
          ));
    })
    .catch((err) => {
      res.status(400).json(new Response(false, null, err.message));
    });
};

export const signOn = (req, res) => {
  const { Nickname: nickname, Email: email, Password: password } = req.body;

  User.signOn(nickname, email, password)
    .then((user) => {
      UserSession.register(user)
        .then((userSession) => res.status(200).json(
          new Response(true, {
            token: userSession.token,
          }).toObject(),
        ))
        .catch((err) => res
          .status(400)
          .json(
            new Response(
              false,
              null,
              `Ошибка регистрации пользователя (${err.message})`,
            ),
          ));
    })
    .catch((err) => {
      res.status(400).json(new Response(false, null, err.message));
    });
};
