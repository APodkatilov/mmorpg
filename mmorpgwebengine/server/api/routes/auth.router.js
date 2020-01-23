import express from "express";
import validationMiddleware from "../middlewares/validationMiddleware";
import {
  signOnValidationRules,
  signInValidationRules
} from "../validators/auth.validator";
import * as authHandler from "../handlers/auth.handler";

const router = express.Router();

router.post(
  "/signin",
  signInValidationRules(),
  validationMiddleware,
  authHandler.signIn
);
router.post(
  "/signon",
  signOnValidationRules(),
  validationMiddleware,
  authHandler.signOn
);

export default router;
