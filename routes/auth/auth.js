import express from "express";
import { register } from "../../controller/auth.js";
const routes = express.Router({
  mergeParams: true,
});

routes.post("/register", register);

export default routes;
