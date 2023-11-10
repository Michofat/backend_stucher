import express from "express";
import { createLesson, updateLesson } from "../../controller/lesson.js";

const routes = express.Router({
  mergeParams: true,
});

routes.post("/createlesson", createLesson);
routes.patch("/updatelesson/:coursid/:teachid/:lessonid", updateLesson);

export default routes;
