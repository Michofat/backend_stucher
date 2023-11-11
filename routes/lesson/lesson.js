import express from "express";
import {
  createLesson,
  deleteLesson,
  getTeachersLesson,
  updateLesson,
} from "../../controller/lesson.js";

const routes = express.Router({
  mergeParams: true,
});

routes.post("/createlesson/:courseid/:teacherid", createLesson);
routes.patch("/updatelesson/:courseid/:teacherid/:lessonid", updateLesson);
routes.get("/getlessons/:teacherid/:courseid", getTeachersLesson);
routes.delete("/deletelesson/:teacherid/:lessonid", deleteLesson);

export default routes;
