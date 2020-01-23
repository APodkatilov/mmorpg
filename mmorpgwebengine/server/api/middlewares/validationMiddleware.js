import { validationResult } from "express-validator";
import Response from "../response";

export default (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push(`[${err.param}]:${err.msg}`));

  return res
    .status(400)
    .json(
      new Response(
        false,
        null,
        `Ошибка проверки входных параметров (${extractedErrors.join(", ")})`
      )
    );
};
