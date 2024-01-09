import express from "express";
import {
  LessonStatus,
  createLesson,
  createLessonLog,
  deleteLesson,
  getLesson,
  getTeachersLesson,
  nextLesson,
  updateLesson,
  updateLessonVideoLink,
} from "../../controller/lesson.js";

const routes = express.Router({
  mergeParams: true,
});

routes.post("/createlesson/:courseid/:teacherid", createLesson);
routes.patch("/updatelesson/:courseid/:teacherid/:lessonid", updateLesson);
routes.get("/lessons/:courseid", getTeachersLesson);
routes.delete("/deletelesson/:teacherid/:lessonid", deleteLesson);
routes.get("/lessondetails/:lessonid/:teacherid", getLesson);
routes.get("/nextlesson/:studentid/:courseid", nextLesson);
routes.get("/lessoncompletestatus/:studentid/:courseid", LessonStatus);
routes.post("/createlessonlog/:studentid/:courseid/:lessonid", createLessonLog);
routes.patch(
  `/updatelessonvideolink/:lessonid/:teacherid/:courseid`,
  updateLessonVideoLink
);

export default routes;

//replace lesson video endpoint
//delete quiz

//quizid and teacherid
