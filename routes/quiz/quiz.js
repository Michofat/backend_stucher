import express from "express";
import { createQuiz } from "../../controller/quiz.js";

const routes = express.Router({
  mergeParams: true,
});

routes.post("/createquiz/:teacherid/:courseid/:lessonid", createQuiz);
export default routes;
