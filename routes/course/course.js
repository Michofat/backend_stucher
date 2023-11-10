import express from "express";
import { createCourse } from "../../controller/course.js";

const routes = express.Router({
  mergeParams: true,
});

routes.post("/createcourse", createCourse);

export default routes;
