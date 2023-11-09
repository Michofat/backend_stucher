import express from "express";
import { test1, test2 } from "../../controller/test.js";
const routes = express.Router({
  mergeParams: true,
});

routes.get("/response", test1);
routes.get("/michofatresponse", test2);

export default routes;
