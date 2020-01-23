import express from "express";
import * as resourceHanlder from "../handlers/resource.handler";

const router = express.Router();

router.get("/amunition/types", resourceHanlder.ammunitionTypes);

export default router;
