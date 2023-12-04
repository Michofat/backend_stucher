import express from "express";
import {
  createLesson,
  deleteLesson,
  getLesson,
  getTeachersLesson,
  updateLesson,
} from "../../controller/lesson.js";

const routes = express.Router({
  mergeParams: true,
});

routes.post("/createlesson/:courseid/:teacherid", createLesson);
routes.patch("/updatelesson/:courseid/:teacherid/:lessonid", updateLesson);
routes.get("/lessons/:courseid", getTeachersLesson);
routes.delete("/deletelesson/:teacherid/:lessonid", deleteLesson);
routes.get("/lessondetails/:lessonid/:teacherid", getLesson);

export default routes;
