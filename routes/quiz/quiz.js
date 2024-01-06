import express from "express";
import {
  createQuiz,
  deleteQuiz,
  getLessonQuiz,
  getLessonQuizEnroll,
  getSingleQuiz,
  updateQuiz,
} from "../../controller/quiz.js";

const routes = express.Router({
  mergeParams: true,
});

routes.post("/createquiz/:lessonid/:courseid/:teacherid", createQuiz);
routes.patch("/updatequiz/:teacherid/:quizid", updateQuiz);
routes.get("/lessonquiz/:lessonid/:teacherid", getLessonQuiz);
routes.get("/lessonquizenrol/:lessonid/:teacherid", getLessonQuizEnroll);
routes.get("/getquiz/:quizid", getSingleQuiz);
routes.delete("/deletequiz/:teacherid/:quizid", deleteQuiz);

export default routes;
